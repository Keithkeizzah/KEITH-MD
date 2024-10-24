module.exports = async (context) => {
  const { client, m, text, dest } = context; // Added 'dest' to the destructuring
  const yts = require("yt-search");

  try {
    if (!text) {
      return m.reply("Provide any media query..");
    }

    const info = await yts(text);
    const results = info.videos;

    if (!results.length) {
      return m.reply("No results found.");
    }

    let captions = "";
    for (let i = 0; i < Math.min(results.length, 10); i++) {
      captions += `----------------\nTitle: ${results[i].title}\nTime: ${results[i].timestamp}\nUrl: ${results[i].url}\n`;
    }
    captions += "\n======\n*powered KEITH-MD*";

    await client.sendMessage(dest, {
      image: { url: results[0].thumbnail },
      caption: captions
    }, { quoted: m });
  } catch (error) {
    m.reply("Failed: " + error.message); // Improved error message
  }
};
