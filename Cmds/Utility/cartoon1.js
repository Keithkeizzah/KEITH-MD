const Jimp = require('jimp');
const fs = require('fs');
const { getRandom } = require(__dirname + "/../../lib/botFunctions");

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
    const enhancedImagePath = `${media}_enhanced.png`;

    // Read the image using Jimp
    const image = await Jimp.read(media);

    
    image
      .resize(1000, Jimp.AUTO)         // Resize to 1000 pixels wide (maintains aspect ratio)
      .quality(80)                     // Set JPEG quality
      .posterize(7)                    // Reduce the number of colors
      .contrast(0.5)                   // Increase contrast
      .brightness(0.1)                 // Increase brightness
      .greyscale()                     // Apply a greyscale filter
      .color([{ apply: 'red', params: [10] }])  // Apply a red tint
      .write(enhancedImagePath);       // Save the enhanced image

    const enhancedImageBuffer = fs.readFileSync(enhancedImagePath);
    await client.sendMessage(m.chat, { image: enhancedImageBuffer, caption: "✨ *Image enhancement to cartoon character successful!*" }, { quoted: m });

    // Clean up: remove the downloaded media file
    fs.unlinkSync(media);
    fs.unlinkSync(enhancedImagePath);
  } catch (error) {
    console.error('Error enhancing image:', error);
    await client.sendMessage(m.chat, { text: 'An error occurred while enhancing the image.' }, { quoted: m });
  }
};
