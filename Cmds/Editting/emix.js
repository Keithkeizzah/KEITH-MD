module.exports = async (context) => {
        const { client, m, botname, text } = context;


const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

const axios = require("axios");
if (!text) return m.reply("No emojis provided ? ")


  const emojis = text.split('+');

  if (emojis.length !== 2) {
    m.reply("Specify the emojis and separate with '+'");
    return;
  }

  const emoji1 = emojis[0].trim();
  const emoji2 = emojis[1].trim();

  try {
    const axios = require('axios');
    const response = await axios.get(`https://levanter.onrender.com/emix?q=${emoji1}${emoji2}`);

    if (response.data.status === true) {
    

      let stickerMess = new Sticker(response.data.result, {
        pack: botname,
        type: StickerTypes.CROPPED,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      });
      const stickerBuffer2 = await stickerMess.toBuffer();
      client.sendMessage(m.chat, { sticker: stickerBuffer2 }, { quoted: m });

    } else {
      m.reply("Unable to create emoji mix.");
    }
  } catch (error) {
    m.reply("An error occurred while creating the emoji mix." + error );
  }


}