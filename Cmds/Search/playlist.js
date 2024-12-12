const axios = require("axios");

module.exports = async (context) => {
  const { client, m, text } = context;

  // Check if the input text is provided
  if (!text) {
    return m.reply("Please provide a query.");
  }

  try {
    // Spotify search API
    const searchApiUrl = `https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(text)}`;
    const searchData = (await axios.get(searchApiUrl)).data;

    // Check if searchData contains tracks
    if (!searchData || searchData.length === 0) {
      return m.reply("No Spotify search results found.");
    }

    // Construct playlist message
    let playlistMessage = `𝐊𝐄𝐈𝐓𝐇 𝐌𝐃 𝐒𝐏𝐎𝐓𝐈𝐅𝐘 𝐏𝐋𝐀𝐘𝐋𝐈𝐒𝐓\n\n`;

    // Loop through search results and construct track info
    searchData.forEach((track) => {
      playlistMessage += `*Title*: ${track.title}\n`;
      playlistMessage += `*Artist*: ${track.artist || "Unknown"}\n`;
      playlistMessage += `*Album*: ${track.album || "Unknown"}\n`;
      playlistMessage += `*URL*: ${track.url}\n\n`;
    });

    // Send the playlist message
    await client.sendMessage(
      m.chat,
      {
        text: playlistMessage,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            showAdAttribution: true,
            title: "KEITH MD SPOTIFY LIST",
            body: "Powered by KeithKeizzah",
            sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  } catch (error) {
    // Send error message
    m.reply(`Error: ${error.message}`);
    console.error(error);
  }
};
