const { Catbox } = require("node-catbox");
const fs = require('fs-extra');
const axios = require('axios');

// Initialize Catbox
const catbox = new Catbox();

// Function to upload a file to Catbox and return the URL
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

// Function to analyze image with Gemini Vision API
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

  // Check if there's a quoted image and text input
  if (!quotedMessage?.imageMessage || !text) {
    return sendReply(client, m, "Please quote an image and provide a question/text for analysis.\nExample: /vision What's in this image?");
  }

  try {
    // Download and upload the image
    const filePath = await client.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
    const imageUrl = await uploadToCatbox(filePath);
    
    // Clean up the downloaded file
    await fs.unlink(filePath).catch(() => {});

    // Analyze the image
    const analysis = await analyzeImage(imageUrl, text);
    
    // Send the result
    await sendReply(client, m, `🔍 Vision Analysis:\n\n${analysis}\n\n🖼️ Image URL: ${imageUrl}`);
  } catch (error) {
    console.error("Vision command error:", error);
    await sendReply(client, m, `❌ Error: ${error.message}`);
  }
};
