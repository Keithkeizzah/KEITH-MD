const fetch = require("node-fetch");

module.exports = async (context) => {
  const { client, m, text } = context;

  const apis = [
    `https://dark.guruapi.tech/egpt?prompt=${encodeURIComponent(text)}`,
    `https://api.siputzx.my.id/api/ai/bard?query=${encodeURIComponent(text)}`
  ];

  try {
    if (!text) return m.reply("provide a text ");

    for (const api of apis) {
      try {
        const data = await fetch(api);
        const msgg = await data.json();

        // Checking if the API response is successful
        if (msgg.message || msgg.data) {
          const final = msgg.message || msgg.data;
          await m.reply(final);
          return;
        }
      } catch (e) {
        // Continue to the next API if one fails
        continue;
      }
    }

    // If no APIs succeeded
    m.reply("An error occurred while communicating with the APIs. Please try again later.");
  } catch (e) {
    m.reply('An error occurred while communicating with the APIs\n' + e);
  }
};
