module.exports = async (context) => {
    const { client, m, text } = context; // Removed duplicate 'm'
 const axios = require("axios");
  const query = text.join(" ");

  if (!query) {
    repondre("Please provide a search query.");
    return;
  }

  try {
    // Make a request to the Spotify search API
    const response = await axios.get(`https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(query)}`);
    const results = response.data.tracks; // Assuming the response structure contains a 'tracks' array

    if (!results || results.length === 0) {
      repondre("No results found.");
      return;
    }

    let captions = "";
    results.slice(0, 10).forEach((track, index) => {
      captions += `*────────────────────*\n${index + 1}.*Title:* ${track.title}\n*Artist:* ${track.artist}\n*Album:* ${track.album}\n*Release Date:* ${track.release_date}\n*Duration:* ${track.duration} seconds\n*URL:* https://open.spotify.com/track/${track.id}\n`;
    });

    captions += "\n─────────────────────\n*POWERED BY KEITH MD*";

    client.sendMessage(m.chat, { 
      image: { url: results[0].thumbnail }, 
      caption: captions 
    }, { quoted: ms });

  } catch (error) {
    m.reply("Error during the search process: " + error.message);
  }
});
