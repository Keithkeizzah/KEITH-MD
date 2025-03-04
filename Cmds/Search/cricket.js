const axios = require('axios');

module.exports = async (context) => {
  try {
    const { client, m } = context;
    const apiUrl = "https://api.cricapi.com/v1/currentMatches?apikey=f68d1cb5-a9c9-47c5-8fcd-fbfe52bace78";
    
    // Make the API call to fetch the cricket matches data
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Check if we received data and if there are any matches
    if (!data || !data.data || !data.data.length) {
      return m.reply("*_Please wait, fetching cricket info..._*");
    }

    let text = "";
    
    // Loop through the matches and construct the response text
    data.data.forEach((match, index) => {
      text += `*--------------------- MATCH ${index + 1} -------------------*\n`;
      text += `*Match Name:* ${match.name || "N/A"}\n`;
      text += `*Match Status:* ${match.status || "N/A"}\n`;
      text += `*Match Date:* ${match.dateTimeGMT || "N/A"}\n`;
      text += `*Match Started:* ${match.matchStarted !== undefined ? match.matchStarted : "N/A"}\n`;
      text += `*Match Ended:* ${match.matchEnded !== undefined ? match.matchEnded : "N/A"}\n\n`;
    });

    // Send the formatted match info
    return m.reply(text, { quoted: m });

  } catch (error) {
    console.error("Error while fetching cricket data:", error);
    return m.reply("*_Uhh dear, Didn't get any results!_*");
  }
};
