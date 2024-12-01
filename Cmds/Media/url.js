module.exports = async (context) => {
    const { client, m, uploadtoimgur } = context;
    const fs = require("fs");
    const path = require('path');
    const util = require("util");

    let q = m.quoted ? m.quoted : m;  // Handle quoted message or current message
    let mime = (q.msg || q).mimetype || '';  // Get MIME type of the media

    if (!mime) {
        return m.reply('Please quote an image, video, audio, or any other media.');
    }

    let mediaBuffer = await q.download();  // Download media

    if (mediaBuffer.length > 10 * 1024 * 1024) {  // Limit media size to 10 MB
        return m.reply('The media is too large. Max size is 10 MB.');
    }

    // Regular expression to detect media types like image, video, audio, etc.
    const mediaTypes = {
        image: /image\/(png|jpe?g|gif)/,
        video: /video\/mp4/,
        audio: /audio\/(mp3|mpeg|ogg|opus)/,
        sticker: /image\/webp/,
        document: /application\/(pdf|octet-stream|zip|rar)/,
        voice: /audio\/(ogg|opus)/
    };

    let mediaType = '';

    // Check for each media type
    for (let type in mediaTypes) {
        if (mediaTypes[type].test(mime)) {
            mediaType = type;
            break;
        }
    }

    if (!mediaType) {
        return m.reply('Unsupported media type or the media is not recognized.');
    }

    try {
        let filePath = await client.downloadAndSaveMediaMessage(q);  // Download and save the media

        let link = '';

        // Handle different media types differently (e.g., using Imgur for images, uploading audio elsewhere)
        if (mediaType === 'image' || mediaType === 'video' || mediaType === 'gif') {
            link = await uploadtoimgur(filePath);  // Upload to imgur for images, videos, gifs
        } else if (mediaType === 'audio' || mediaType === 'voice') {
            link = await uploadAudio(filePath);  // Handle audio or voice note uploads
        } else if (mediaType === 'sticker') {
            link = await uploadSticker(filePath);  // Handle sticker uploads
        } else if (mediaType === 'document') {
            link = await uploadDocument(filePath);  // Handle document uploads
        }

        // Send the media link to the user
        m.reply(`Media Link: \n\n${link}`);

    } catch (error) {
        console.error(error);
        m.reply('An error occurred while processing the media.');
    }
};

// Function to upload audio files
async function uploadAudio(filePath) {
    // Implement audio upload logic here
    // For example, uploading to a cloud service or a specific API for audio files
    return 'https://example.com/audio-upload-link';  // Replace with actual upload logic
}

// Function to upload stickers
async function uploadSticker(filePath) {
    // Implement sticker upload logic here
    return 'https://example.com/sticker-upload-link';  // Replace with actual upload logic
}

// Function to upload documents (e.g., PDFs, ZIPs)
async function uploadDocument(filePath) {
    // Implement document upload logic here
    return 'https://example.com/document-upload-link';  // Replace with actual upload logic
}
