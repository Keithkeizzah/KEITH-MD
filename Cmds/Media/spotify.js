const axios = require("axios");

module.exports = async (context) => {
  const { client, m, text } = context;

  // Check if the input text is provided
  if (!text) {
    return m.reply("Please provide a query.");
  }

  try {
    // Spotify track search API URL
    const searchApiUrl = `https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(text)}`;
    const searchData = (await axios.get(searchApiUrl)).data;

    const trackData = searchData[0];
    if (!trackData) {
      return m.reply("No Spotify track found for your query.");
    }

    // Track information to be displayed
    const trackInfo = `
    *Title*   : ${trackData.title}
    *Artist* : ${trackData.artist}
    *URL*    : ${trackData.url}`;

    // Send track info message
    await client.sendMessage(
      m.chat,
      {
        text: trackInfo,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            showAdAttribution: true,
            title: trackData.title,
            body: "KEITH MD",
            thumbnailUrl: trackData.thumbnail,
            mediaType: 1,
            sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
            renderLargerThumbnail: false,
          },
        },
      },
      { quoted: m }
    );

    // Spotify download API URL
    const downloadApiUrl = `https://spotifyapi.caliphdev.com/api/download/track?url=${encodeURIComponent(trackData.url)}`;
    const response = await axios({
      url: downloadApiUrl,
      method: "GET",
      responseType: "stream",
    });

    // Check if the response is an audio stream
    if (response.headers["content-type"] === "audio/mpeg") {
      await client.sendMessage(
        m.chat,
        { audio: { stream: response.data }, mimetype: "audio/mpeg" },
        { quoted: m }
      );
    } else {
      m.reply("Failed to fetch Spotify audio. Please try again later.");
    }
  } catch (error) {
    m.reply(`Error: ${error.message}`);
    console.error(error);
  }
};
