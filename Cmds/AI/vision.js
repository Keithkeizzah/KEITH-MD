const fs = require('fs-extra');
const axios = require('axios');
const { downloadAndSaveMediaMessage } = require('@whiskeysockets/baileys');

module.exports = async (context) => {
  const { client, m, text, sendReply } = context;

  const quotedMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  
  if (!quotedMessage) {
    return sendReply(client, m, "Please quote an image to analyze.");
  }

  
  if (!quotedMessage.imageMessage) {
    return sendReply(client, m, "Only images can be analyzed. Please quote an image.");
  }

 
  const question = text.trim() || "What's in this image?";

  try {
    
    const filePath = await client.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
    
    
    const catbox = new (require("node-catbox"))();
    const imageUrl = await catbox.uploadFile({ path: filePath });
    
    
    await fs.unlink(filePath);

    if (!imageUrl) {
      throw new Error("Failed to upload image");
    }

    
    const apiUrl = `https://apis-keith.vercel.app/ai/gemini-vision?image=${encodeURIComponent(imageUrl)}&q=${encodeURIComponent(question)}`;
    const response = await axios.get(apiUrl);

    if (!response.data?.status || !response.data?.result) {
      throw new Error("Invalid response from vision API");
    }

    
    await sendReply(client, m, `🔍 Vision Analysis:\n\n${response.data.result}`);

  } catch (error) {
    console.error("Vision analysis error:", error);
    await sendReply(client, m, `Error analyzing image: ${error.message}`);
  }
};
