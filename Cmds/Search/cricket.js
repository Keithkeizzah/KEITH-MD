const axios = require('axios');

module.exports = async (context) => {
  try {
    const { client, m } = context;
    const apiUrl = "https://api.cricapi.com/v1/currentMatches?apikey=f68d1cb5-a9c9-47c5-8fcd-fbfe52bace78";
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.data.length) {
      return m.reply("*_Please Wait, Getting Cricket Info_*");
    }

    let text = "";

    for (let i = 0; i < data.data.length; i++) {
      text += `*--------------------- MATCH ${i + 1} -------------------*\n`;
      text += `*Match Name:* ${data.data[i].name}\n`;
      text += `*Match Status:* ${data.data[i].status}\n`;
      text += `*Match Date:* ${data.data[i].dateTimeGMT}\n`;
      text += `*Match Started:* ${data.data[i].matchStarted}\n`;
      text += `*Match Ended:* ${data.data[i].matchEnded}\n\n`;
    }

    return m.reply(text, { quoted: m });
  } catch (error) {
    console.error("Uhh dear, Did not get any results!", error);
    return m.reply("*_Uhh dear, Didn't get any results!_*");
  }
};
