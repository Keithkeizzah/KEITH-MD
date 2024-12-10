module.exports = async (context) => {
    const { client, m } = context;
    const fs = require("fs");
    const { Catbox } = require("node-catbox");
    const path = require('path');
    const { downloadAndSaveMediaMessage } = require('@whiskeysockets/baileys');
    
    const catbox = new Catbox();

    async function uploadToCatbox(filePath) {
        if (!fs.existsSync(filePath)) {
            throw new Error("File does not exist");
        }
        try {
            const uploadResult = await catbox.uploadFile({ path: filePath });
            if (uploadResult) {
                return uploadResult;
            } else {
                throw new Error("Error retrieving file link");
            }
        } catch (error) {
            throw new Error(String(error));
        }
    }

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime) return m.reply('Please quote a media message.');

    let mediaBuffer = await q.download();

    // Check if the media is too large
    if (mediaBuffer.length > 10 * 1024 * 1024) return m.reply('Media is too large.');

    // Check if the mime type is a valid media type
    let isValidMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    if (isValidMedia) {
        // Save the media file to a temporary path
        const mediaPath = path.join(__dirname, 'tempfile');  // Adjust to a proper path for your environment
        fs.writeFileSync(mediaPath, mediaBuffer);

        try {
            // Upload to Catbox
            const uploadResult = await uploadToCatbox(mediaPath);

            // Delete the temporary file after upload
            fs.unlinkSync(mediaPath);

            // Return the Catbox URL to the user
            m.reply(`Media uploaded successfully!\n\nHere is the link: ${uploadResult.fileUrl}`);
        } catch (error) {
            m.reply(`Error uploading media to Catbox: ${error.message}`);
        }
    } else {
        m.reply('Please send a valid image or video file.');
    }
};
