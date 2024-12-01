const axios = require("axios");

module.exports = async (context) => {
  const { client, m, text } = context;

  if (!text) {
    m.reply("Please provide a search query.");
    return;
  }

  try {
    // Make a request to the Spotify search API
    const response = await axios.get(`https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(text)}`);
    
    // Log the response for debugging purposes (can be removed later)
    console.log(response.data);

    const results = response.data.tracks; // Assuming the response contains a 'tracks' array

    // Check if there are any tracks in the response
    if (!results || results.length === 0) {
      m.reply("No results found.");
      return;
    }

    // Prepare a caption with the first 10 tracks found
    let captions = "";
    results.slice(0, 10).forEach((track, index) => {
      captions += `*────────────────────*\n${index + 1}.*Title:* ${track.title}\n*Artist:* ${track.artist}\n*Album:* ${track.album}\n*Release Date:* ${track.release_date}\n*Duration:* ${track.duration} seconds\n*URL:* https://open.spotify.com/track/${track.id}\n`;
    });

    captions += "\n─────────────────────\n*POWERED BY KEITH MD*";

    // Send the message with the first track's thumbnail and the caption
    client.sendMessage(m.chat, { 
      image: { url: results[0].thumbnail }, 
      caption: captions 
    }, { quoted: m });

  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error during the search process:", error);
    m.reply("Error during the search process. Please try again later.");
  }
};
