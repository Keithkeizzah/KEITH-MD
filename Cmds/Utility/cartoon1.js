const fs = require('fs');
const sharp = require('sharp');
const { exec } = require('child_process');
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
    const outputPath = getRandom(".png");

    // Enhance the image to a cartoon-like character
    exec(`convert ${media} -resize 1000x1000 -cartoon 0x2 ${outputPath}`, (err) => {
      fs.unlinkSync(media);
      if (err) {
        client.sendMessage(m.chat, { text: "*Error!*" }, { quoted: m });
        return;
      }

      const enhancedImageBuffer = fs.readFileSync(outputPath);
      client.sendMessage(m.chat, { image: enhancedImageBuffer, caption: "✨ *Image enhancement to cartoon character successful!*" }, { quoted: m });
      fs.unlinkSync(outputPath);
    });
  } catch (error) {
    console.error('Error enhancing image:', error);
    await client.sendMessage(m.chat, { text: 'An error occurred while enhancing the image.' }, { quoted: m });
  }
};
