const { wallpaper } = require(__dirname + "/../../lib/scrap");

module.exports = async (context) => {
  const { client, m, text } = context;

  if (!text) {
    await client.sendMessage(m.chat, { text: "📌 *Enter a search query.*" }, { quoted: m });
    return;
  }

  try {
    const results = await wallpaper(text);
    if (!results.length) {
      await client.sendMessage(m.chat, { text: "❌ *No wallpapers found.*" }, { quoted: m });
      return;
    }

    const randomWallpaper = results[Math.floor(Math.random() * results.length)];
    await client.sendMessage(
      m.chat,
      {
        caption: `📌 *Title:* ${randomWallpaper.title}\n📁 *Category:* ${randomWallpaper.type}\n🔗 *Source:* ${randomWallpaper.source}\n🖼️ *Media URL:* ${randomWallpaper.image[2] || randomWallpaper.image[1] || randomWallpaper.image[0]}`,
        image: { url: randomWallpaper.image[0] }
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    await client.sendMessage(m.chat, { text: "❌ *An error occurred while fetching the wallpaper.*" }, { quoted: m });
  }
};
