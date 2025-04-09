const fs = require('fs-extra');
const axios = require('axios');
const { downloadAndSaveMediaMessage } = require('@whiskeysockets/baileys');

module.exports = async (context) => {
  const { client, m, text, sendReply } = context;
  
  // Check if there's a quoted message with media
  const quotedMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  
  if (!quotedMessage) {
    return sendReply(client, m, "Please quote an image to analyze.");
  }

  // Check if the quoted message has an image
  if (!quotedMessage.imageMessage) {
    return sendReply(client, m, "Only images can be analyzed. Please quote an image.");
  }

  // Get the question/text prompt (default if not provided)
  const question = text.trim() || "What's in this image?";

  try {
    // Download the image
    const filePath = await client.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
    
    // Upload to Catbox (or any temporary hosting)
    const catbox = new (require("node-catbox"))();
    const imageUrl = await catbox.uploadFile({ path: filePath });
    
    // Clean up the downloaded file
    await fs.unlink(filePath);

    if (!imageUrl) {
      throw new Error("Failed to upload image");
    }

    // Call the vision API
    const apiUrl = `https://apis-keith.vercel.app/ai/gemini-vision?image=${encodeURIComponent(imageUrl)}&q=${encodeURIComponent(question)}`;
    const response = await axios.get(apiUrl);

    if (!response.data?.status || !response.data?.result) {
      throw new Error("Invalid response from vision API");
    }

    // Send the analysis result
    await sendReply(client, m, `🔍 Vision Analysis:\n\n${response.data.result}`);

  } catch (error) {
    console.error("Vision analysis error:", error);
    await sendReply(client, m, `Error analyzing image: ${error.message}`);
  }
};
