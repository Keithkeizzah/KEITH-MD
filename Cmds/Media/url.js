const fs = require("fs");
const path = require('path');
const util = require("util");

module.exports = async (context) => {
    const { client, m, uploadtoimgur } = context;
    
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime) return m.reply('Quote an image, video, audio, or gif to upload.');

    let mediaBuffer = await q.download();

    if (mediaBuffer.length > 10 * 1024 * 1024) return m.reply('Media is too large.');

    // Supported media types (image, video, audio, gif)
    let isMedia = /image\/(png|jpe?g|gif)|video\/mp4|audio\/(mp3|ogg|aac)/.test(mime);

    if (isMedia) {
        try {
            let fta2 = await client.downloadAndSaveMediaMessage(q);

            // Handling upload to imgur for images/gifs and other platforms for audio
            let link = await uploadtoimgur(fta2);

            const fileSizeMB = (mediaBuffer.length / (1024 * 1024)).toFixed(2);

            m.reply(`Media Link:-\n\n${link}\n\nFile Size: ${fileSizeMB} MB`);
        } catch (error) {
            console.error(error);
            m.reply('Error uploading media.');
        }
    } else {
        m.reply('Unsupported media type. Please upload an image, video, audio, or gif.');
    }
};
