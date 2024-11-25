module.exports = async (context) => {
    const { client, m, uploadtoimgur } = context;
    const fs = require("fs");
    const path = require("path");

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime) return m.reply('Quote an image, video, or audio file.');

    let mediaBuffer = await q.download();

    // Check if the media file is too large
    if (mediaBuffer.length > 10 * 1024 * 1024) return m.reply('Media is too large.');

    // Define regex patterns for different media types
    let isImageOrVideo = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    let isAudio = /audio\//.test(mime); // This regex matches any audio MIME type

    if (isImageOrVideo) {
        // Handle image or video files
        let fta2 = await client.downloadAndSaveMediaMessage(q);
        let link = await uploadtoimgur(fta2);
        const fileSizeMB = (mediaBuffer.length / (1024 * 1024)).toFixed(2);

        m.reply(`Media Link:\n\n${link}`);
    } else if (isAudio) {
        // Handle audio files (including voice notes)
        let audioFilePath = path.join(__dirname, 'temp_audio', `${Date.now()}.audio`); // Save audio file temporarily
        fs.writeFileSync(audioFilePath, mediaBuffer);

        // Assuming uploadtoimgur is capable of handling audio (if not, you might need another service like SoundCloud or a file hosting service)
        let audioLink = await uploadtoimgur(audioFilePath);

        // Optionally remove the temporary audio file after upload
        fs.unlinkSync(audioFilePath);

        m.reply(`Audio Link:\n\n${audioLink}`);
    } else {
        // Error message if it's neither a valid image, video, nor audio
        m.reply('Unsupported media type.');
    }
};
