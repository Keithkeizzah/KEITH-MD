const { Catbox } = require("node-catbox");
const fs = require('fs-extra');
const axios = require('axios');


const catbox = new Catbox();


async function uploadToCatbox(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }
  try {
    const uploadResult = await catbox.uploadFile({ path: filePath });
    return uploadResult;
  } catch (error) {
    throw new Error(`Catbox upload failed: ${error.message}`);
  }
}

async function analyzeImage(imageUrl, question) {
  try {
    const apiUrl = `https://apis-keith.vercel.app/ai/gemini-vision?image=${encodeURIComponent(imageUrl)}&q=${encodeURIComponent(question)}`;
    const response = await axios.get(apiUrl);
    
    if (response.data.status && response.data.result) {
      return response.data.result;
    }
    throw new Error("API response was not successful");
  } catch (error) {
    throw new Error(`Vision API error: ${error.message}`);
  }
}

module.exports = async (context) => {
  const { client, m, text, sendReply } = context;
  const quotedMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;

  
  if (!quotedMessage?.imageMessage || !text) {
    return sendReply(client, m, "Please quote an image and provide a question/text for analysis.\nExample: /vision What's in this image?");
  }

  try {
    
    const filePath = await client.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
    const imageUrl = await uploadToCatbox(filePath);
    
   
    await fs.unlink(filePath).catch(() => {});

  
    const analysis = await analyzeImage(imageUrl, text);
    
    
    await sendReply(client, m, `🔍 Vision Analysis:\n\n${analysis}\n\n🖼️ Image URL: ${imageUrl}`);
  } catch (error) {
    console.error("Vision command error:", error);
    await sendReply(client, m, `❌ Error: ${error.message}`);
  }
};
