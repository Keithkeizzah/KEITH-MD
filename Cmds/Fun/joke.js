const axios = require('axios');

module.exports = async (context) => {
  try {
    const { client, m } = context;
    const apiUrl = "https://v2.jokeapi.dev/joke/Any?type=single";
    
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.error) {
      return m.reply("❌ Error fetching joke. Please try again later.");
    }

    let jokeMessage = `😂 *Random Joke:*\n\n${data.joke}\n\n`;
    jokeMessage += `*Category:* ${data.category}\n`;
    jokeMessage += `*Safe:* ${data.safe}\n`;
    jokeMessage += `*ID:* ${data.id}\n`;

    m.reply(jokeMessage);
  } catch (error) {
    console.error("Error fetching joke:", error);
    m.reply("❌ Error fetching joke. Please try again later.");
  }
};
