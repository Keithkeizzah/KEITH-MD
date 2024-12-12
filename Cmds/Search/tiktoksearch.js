const axios = require("axios");

module.exports = async (context) => {
  const { client, m, text } = context;

  // Check if the input text is provided
  if (!text) {
    return m.reply("Please provide a query.");
  }

  try {
    // Spotify search API (Adjust the endpoint if necessary)
    const searchApiUrl = `https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(text)}`;
    const response = await axios.get(searchApiUrl);
    const searchData = response.data;

    // Check if searchData contains tracks
    if (!searchData || searchData.length === 0) {
      return m.reply("No TikTok search results found.");
    }

    // Construct playlist message
    let playlistMessage = `𝐊𝐄𝐈𝐓𝐇 𝐌𝐃 𝐓𝐈𝐊𝐓𝐎𝐊 𝐒𝐄𝐀𝐑𝐂𝐇\n\n`;

    // Loop through search results and construct track info with numbers
    searchData.forEach((track, index) => {
      const trackNumber = index + 1; // Number tracks starting from 1
      playlistMessage += `*┃${trackNumber}.* ${track.title}\n`;
      playlistMessage += `*┃Region*: ${track.region || "Unknown"}\n`;
      playlistMessage += `*┃Creator*: ${track.creator || "Unknown"}\n`;
      playlistMessage += `*┃ID*: ${track.nowm}\n`;
      playlistMessage += `*┃Creator Image*: ${track.imageUrl || "Unknown"}\n`; // Fixed the key for creator's image URL
      playlistMessage += `───────────────────◆\n\n`;
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
            renderLargerThumbnail: false,
          },
        },
      },
      { quoted: m }
    );
  } catch (error) {
    // Send error message
    console.error(error);  // Log the error to the console
    m.reply(`Error: ${error.message || 'Something went wrong.'}`);
  }
};
