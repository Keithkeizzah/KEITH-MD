const axios = require('axios');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = async (context) => {
  try {
    const { client, m, text, packname, author } = context;

    if (!text) {
      return m.reply("❌ Please provide text to convert to a sticker.");
    }

    // Extract the text, name, and avatar URL
    const [quoteText, name, avatarUrl] = text.split('|').map(item => item.trim());

    if (!quoteText || !name || !avatarUrl) {
      return m.reply("❌ Please provide the text, name, and avatar URL in the format: `text | name | avatarUrl`.");
    }

    const apiUrl = `https://api.ryzendesu.vip/api/image/quotly?text=${encodeURIComponent(quoteText)}&name=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatarUrl)}`;

    // Fetch the image from the API
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    const imageBuffer = response.data;

    // Create a sticker from the image buffer
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
