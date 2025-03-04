const axios = require('axios');

module.exports = async (context) => {
  const { client, m } = context;
  const apiUrl = "https://api.cricapi.com/v1/currentMatches?apikey=f68d1cb5-a9c9-47c5-8fcd-fbfe52bace78";

  try {
    // Make the API call to fetch the cricket matches data
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Check if we received data and if there are any matches
    if (!data || !data.data || data.data.length === 0) {
      return m.reply("*_No current matches found. Please try again later._*");
    }

    let text = "";

    // Loop through the matches and construct the response text
    data.data.forEach((match, index) => {
      text += `*--------------------- MATCH ${index + 1} -------------------*\n`;
      text += `*Match Name:* ${match.name || "N/A"}\n`;
      text += `*Match Status:* ${match.status || "N/A"}\n`;
      text += `*Match Date:* ${match.dateTimeGMT || "N/A"}\n`;
      text += `*Match Started:* ${match.matchStarted !== undefined ? (match.matchStarted ? "Yes" : "No") : "N/A"}\n`;
      text += `*Match Ended:* ${match.matchEnded !== undefined ? (match.matchEnded ? "Yes" : "No") : "N/A"}\n\n`;

      // Add score details if available
      if (match.score && match.score.length > 0) {
        match.score.forEach((inning, i) => {
          text += `*Inning ${i + 1}:* ${inning.inning}\n`;
          text += `  *Runs:* ${inning.r}\n`;
          text += `  *Wickets:* ${inning.w}\n`;
          text += `  *Overs:* ${inning.o}\n\n`;
        });
      }
    });

    // Send the formatted match info
    return m.reply(text, { quoted: m });

  } catch (error) {
    console.error("Error while fetching cricket data:", error);
    return m.reply("*_An error occurred while fetching cricket data. Please try again later._*");
  }
};
