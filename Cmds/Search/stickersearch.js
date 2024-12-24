module.exports = async (context) => {

const { client, m, text, botname } = context;
const axios = require("axios");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

  if (!text) {
    m.reply("Provide a search term for the sticker!");
    return;
  }

if (m.isGroup) m.reply("To avoid spam, I will send the stickers in your inbox. 📥") 

  
  const tenorApiKey = "AIzaSyCyouca1_KKy4W_MG1xsPzuku5oa8W358c"; 

  try { for ( i = 0 ; i < 8 ; i++) {
    const gif = await axios.get(
      `https://tenor.googleapis.com/v2/search?q=${text}&key=${tenorApiKey}&client_key=my_project&limit=8&media_filter=gif`
    );

    const gifUrl = gif.data.results[i].media_formats.gif.url;

const stickerMess = new Sticker(gifUrl, {
      pack: botname,
      
      type: StickerTypes.FULL,
      categories: ["🤩", "🎉"],
      id: "12345",
      quality: 60,
      background: "transparent",
    });
    const stickerBuffer2 = await stickerMess.toBuffer();
    await client.sendMessage(m.sender, { sticker: stickerBuffer2 }, { quoted: m }); }


  } catch (error) {
    
    m.reply("Some error occured while fetching all stickers.");
  }

}