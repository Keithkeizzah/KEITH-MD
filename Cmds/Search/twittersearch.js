const axios = require("axios");

module.exports = async (context) => {
  const { client, m, text } = context;

  // Check if the input text is provided
  if (!text) {
    return m.reply("Please provide a query.");
  }

  try {
    // Spotify search API (Adjust the endpoint if necessary)
    const searchApiUrl = `https://apis-starlights-team.koyeb.app/starlight/Twitter-Posts?text=${encodeURIComponent(text)}`;
    const response = await axios.get(searchApiUrl);
    const searchData = response.data.result;  // Assuming 'result' contains an array of tweets

    // Check if searchData contains results
    if (!searchData || searchData.length === 0) {
      return m.reply("No Twitter search results found.");
    }

    // Construct the search message
    let searchMessage = `𝐊𝐄𝐈𝐓𝐇 𝐌𝐃 𝐓𝐖𝐈𝐓𝐓𝐄𝐑 𝐒𝐄𝐀𝐑𝐂𝐇\n\n`;
    searchMessage += `Creator: ${response.data.creator}\n\n`;  // Include the creator info

    // Loop through search results and construct the message
    searchData.forEach((track, index) => {
      const trackNumber = index + 1; // Number tracks starting from 1
      searchMessage += `*┃${trackNumber}.* ${track.user}\n`;
      searchMessage += `*┃Profile*: ${track.profile || "Unknown"}\n`;
      searchMessage += `*┃Post*: ${track.post}\n`;  // The text of the tweet
      searchMessage += `*┃User Link*: ${track.user_link}\n`;  // Link to the user's profile
      searchMessage += `───────────────────◆\n\n`;
    });

    // Send the search result message
    await client.sendMessage(
      m.chat,
      {
        text: searchMessage,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            showAdAttribution: true,
            title: "KEITH MD TWITTER SEARCH",
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
