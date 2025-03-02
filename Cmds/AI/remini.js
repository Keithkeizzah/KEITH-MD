const { downloadAndSaveMediaMessage } = require('@whiskeysockets/baileys');
const { enhanceImage } = require(__dirname + "/../../lib/remini");
const fs = require('fs').promises;
const path = require('path');

module.exports = async (context) => {
  const { client, m, text: instructionText } = context;

  try {
    // Check if there is a quoted message
    if (!m.quoted) {
      return await client.sendMessage(m.chat, { 
        text: "Please reply to an image message with your enhancement instruction." 
      }, { quoted: m });
    }

    // Verify instruction text exists
    if (!instructionText) {
      return await client.sendMessage(m.chat, { 
        text: "Please provide enhancement instructions. This feature uses Gemini Pro Vision." 
      }, { quoted: m });
    }

    // Check if quoted message is an image
    if (!m.quoted.mimetype.startsWith('image/')) {
      return await client.sendMessage(m.chat, { 
        text: "Quoted message is not an image. Please reply to an image." 
      }, { quoted: m });
    }

    try {
      // Download the quoted image
      const mediaPath = path.join(__dirname, 'temp', `${Date.now()}.jpg`);
      const downloadResult = await downloadAndSaveMediaMessage(
        m.quoted,
        { filename: mediaPath }
      );

      if (!downloadResult) {
        return await client.sendMessage(m.chat, { 
          text: "❌ Failed to download image. Please try again." 
        }, { quoted: m });
      }

      // Read the downloaded image
      const imageBuffer = await fs.readFile(mediaPath);
      
      // Process the image
      const enhancedImage = await enhanceImage(imageBuffer, 'enhance');
      
      // Clean up temporary file
      await fs.unlink(mediaPath);

      // Send result
      await client.sendMessage(m.chat, { 
        image: enhancedImage,
        caption: "✅ Image enhanced successfully!" 
      }, { quoted: m });

    } catch (error) {
      console.error('Processing error:', error);
      await client.sendMessage(m.chat, { 
        text: "❌ Failed to process image. Please try again later." 
      }, { quoted: m });
    }
  } catch (error) {
    console.error('General error:', error);
    await client.sendMessage(m.chat, { 
      text: "❌ An unexpected error occurred." 
    }, { quoted: m });
  }
};
