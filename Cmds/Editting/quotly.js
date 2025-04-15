const axios = require('axios');
const Jimp = require('jimp');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = async (context) => {
  try {
    const { client, m, text, packname, author } = context;

    if (!text) {
      return m.reply("❌ Please provide text to convert to a sticker.");
    }

    // Download the base image and avatar
    const baseImage = await Jimp.read('https://files.catbox.moe/y9w61q.jpg');
    const avatarImage = await Jimp.read('https://files.catbox.moe/pqywab.jpg');

    // Resize the avatar image
    avatarImage.resize(50, 50); // Adjust the size as needed

    // Define text colors
    const colors = ['#00FF00', '#FF0000', '#0000FF']; // Green, Red, Blue

    // Add the avatar and name to the base image
    baseImage.composite(avatarImage, 10, 10); // Adjust the position as needed
    baseImage.print(
      await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK),
      70,
      10,
      { text: 'Keith', alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT },
      200
    );

    // Add the text to the base image
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const words = text.split(' ');
    let x = 10;
    let y = 70; // Adjust the starting position as needed

    for (let i = 0; i < words.length; i++) {
      baseImage.print(font, x, y, { text: words[i], alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT }, 500);
      x += Jimp.measureText(font, words[i] + ' ');

      // Change color for the next word
      baseImage.color([{ apply: 'mix', params: [colors[i % colors.length], 100] }]);
    }

    // Convert the image to a sticker
    const imageBuffer = await baseImage.getBufferAsync(Jimp.MIME_PNG);
    const stickerResult = new Sticker(imageBuffer, {
      pack: packname,
      author: author,
      type: StickerTypes.FULL,
      categories: ["🤩", "🎉"],
      id: "12345",
      quality: 70,
      background: "transparent",
    });

    const buffer = await stickerResult.toBuffer();
    client.sendMessage(m.chat, { sticker: buffer }, { quoted: m });

  } catch (e) {
    console.error("Error in creating sticker:", e);
    m.reply("❌ An error occurred while creating the sticker. Please try again later.");
  }
};
