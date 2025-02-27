const { Catbox } = require("node-catbox");
const fs = require('fs-extra');
const { downloadAndSaveMediaMessage } = require('@whiskeysockets/baileys');
const { sendReply, sendMediaMessage } = require(__dirname + "/../../lib/context"); //
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

module.exports = async (context) => {
  const { client, m } = context;

  const quotedMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;

  if (quotedMessage) {
    let filePath;

    if (quotedMessage.imageMessage) {
      filePath = await client.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
    } else if (quotedMessage.videoMessage) {
      filePath = await client.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
    } else if (quotedMessage.stickerMessage) {
      filePath = await client.downloadAndSaveMediaMessage(quotedMessage.stickerMessage);
    } else if (quotedMessage.audioMessage) {
      filePath = await client.downloadAndSaveMediaMessage(quotedMessage.audioMessage);
    } else {
      return sendReply(client, m, "Please quote an image, video, GIF, sticker, or audio to upload."); // Use sendReply for text replies
    }

    try {
      const link = await uploadToCatbox(filePath);
      await sendReply(client, m, `Media Link:\n\n${link}`); // Use sendReply for success messages
    } catch (error) {
      await sendReply(client, m, 'Error uploading media. Please try again later.' + error); // Use sendReply for error messages
      console.error(error);  // Log any error to the console for debugging
    }
  } else {
    return sendReply(client, m, "Please quote an image, video, GIF, sticker, or audio to upload."); // Use sendReply for text replies
  }
};
/*const uploadtoimgur = require(__dirname + "/../../lib/Imgur");

const fs = require("fs");
const path = require("path");
const util = require("util");

module.exports = async (context) => {
  const { client, m } = context;
  
  // Get quoted media or current message
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';

  // Check if mime type exists
  if (!mime) return m.reply('Please quote an image or video.');

  // Download media buffer
  let mediaBuffer = await q.download();

  // Check if media is too large
  if (mediaBuffer.length > 10 * 1024 * 1024) {
    return m.reply('Media is too large. Please upload a file smaller than 10MB.');
  }

  // Check if the media is an image or video
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);

  if (isTele) {
    try {
      // Download and save the media file
      let fta2 = await client.downloadAndSaveMediaMessage(q);

      // Upload to Imgur
      let link = await uploadtoimgur(fta2);

      // Calculate file size
      const fileSizeMB = (mediaBuffer.length / (1024 * 1024)).toFixed(2);

      // Send media link to user
      m.reply(`Media Link:\n\n${link}`);
    } catch (error) {
      m.reply('Error uploading media. Please try again later.');
      console.error(error);  // Log any error to the console for debugging
    }
  } else {
    m.reply('Unsupported media format. Please send a supported image or video.');
  }
};*/
