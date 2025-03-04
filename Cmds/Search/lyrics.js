const fetch = require("node-fetch");
const yts = require("yt-search");

module.exports = async (context) => {
  const { client, m, text } = context;

  try {
    if (!text) return m.reply("Please provide a song name.");

    // Search for lyrics
    const lyricsResponse = await fetch(`https://api.ryzendesu.vip/api/search/lyrics?query=${encodeURIComponent(text)}`);
    const lyricsData = await lyricsResponse.json();

    if (!lyricsData || lyricsData.length === 0) return m.reply("No lyrics found for your search.");

    const song = lyricsData[0];

    // Search for image using YTS
    const search = await yts(song.trackName);
    const image = search.all[0]?.image || "https://via.placeholder.com/150";

    const caption = `
      *${song.trackName}* by *${song.artistName}*
      Album: ${song.albumName}
      Duration: ${song.duration} seconds
      Instrumental: ${song.instrumental ? "Yes" : "No"}

      *Lyrics:*
      ${song.plainLyrics}
    `;

    await client.sendMessage(m.chat, {
      image: { url: image },
      caption: caption
    }, { quoted: m });

  } catch (e) {
    m.reply('An error occurred while processing your request\n' + e);
  }
};
