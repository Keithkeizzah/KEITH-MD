const path = require('path');
const fs = require('fs-extra');
const { Catbox } = require('node-catbox');
const { downloadAndSaveMediaMessage } = require('@whiskeysockets/baileys');

module.exports = async (context) => {
  const { client, m } = context;

  // Initialize Catbox
  const catbox = new Catbox();

  // Function to upload a file to Catbox and return the URL
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

  // Get the quoted message or the current message
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';

  // If no mime type, ask the user to quote media
  if (!mime) return m.reply('Please quote an image, video, or audio.');

  // Download the media buffer
  let mediaBuffer = await q.download();

  // Check if the media file size exceeds 10MB
  if (mediaBuffer.length > 10 * 1024 * 1024) {
    return m.reply('Media file is too large. Max size is 10MB.');
  }

  let mediaPath;

  // Check the type of media and download accordingly
  if (q.videoMessage || q.gifMessage) {
    // Video or GIF
    mediaPath = await client.downloadAndSaveMediaMessage(q);
  } else if (q.imageMessage) {
    // Image
    mediaPath = await client.downloadAndSaveMediaMessage(q);
  } else if (q.audioMessage || q.pttMessage) {
    // Audio or Voice message (PTT)
    mediaPath = await client.downloadAndSaveMediaMessage(q);
  } else if (q.documentMessage) {
    // Document (PDF, etc.)
    mediaPath = await client.downloadAndSaveMediaMessage(q);
  } else {
    return m.reply("No supported media (image, video, audio, or document) found.");
  }

  try {
    // Upload the media to Catbox and get the URL
    const fileUrl = await uploadToCatbox(mediaPath);

    // Delete the local media file after upload
    fs.unlinkSync(mediaPath);

    // Respond with the URL of the uploaded file
    m.reply(fileUrl);
  } catch (error) {
    console.error("Error while creating the URL:", error);
    m.reply("Oops, there was an error while uploading the media.");
  }
};
