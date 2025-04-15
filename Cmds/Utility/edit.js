const axios = require('axios');
const sharp = require('sharp');

module.exports = async (context) => {
  const { client, m } = context;

  try {
    const quoted = m.quoted ? m.quoted : null;
    const mime = quoted?.mimetype || "";

    if (!quoted || !/image/.test(mime)) {
      await client.sendMessage(m.chat, { text: `Reply to an *image file* to enhance it.` }, { quoted: m });
      return;
    }

    const media = await client.downloadAndSaveMediaMessage(quoted);
    
    // Enhance the image using sharp
    const enhancedImageBuffer = await sharp(media)
      .resize({ width: 1000 }) // Resize to 1000 pixels wide (maintains aspect ratio)
      .sharpen()               // Sharpen the image
      .toBuffer();

    await client.sendMessage(m.chat, { image: enhancedImageBuffer, caption: "✨ *Image enhancement successful!*" }, { quoted: m });

    // Clean up: remove the downloaded media file
    fs.unlinkSync(media);
  } catch (error) {
    console.error('Error enhancing image:', error);
    await client.sendMessage(m.chat, { text: 'An error occurred while enhancing the image.' }, { quoted: m });
  }
};
