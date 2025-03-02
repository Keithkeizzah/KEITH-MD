const fetch = require("node-fetch");

module.exports = async (context) => {
  const { client, m, text, sendReply, sendMediaMessage } = context;

  const apis = [
    `https://dark.guruapi.tech/egpt?prompt=${encodeURIComponent(text)}`,
    `https://apis.davidcyriltech.my.id/ai/metaai?text=${encodeURIComponent(text)}`,
    `https://api.siputzx.my.id/api/ai/metaai?query=${encodeURIComponent(text)}`
  ];

  try {
    if (!text) return sendReply(client, m, "provide a text ");

    for (const api of apis) {
      try {
        const data = await fetch(api);
        const msgg = await data.json();

        // Checking if the API response is successful
        if (msgg.message || msgg.data) {
          const final = msgg.message || msgg.data;
          await sendReply(client, m, final);
          return;
        }
      } catch (e) {
        // Continue to the next API if one fails
        continue;
      }
    }

    // If no APIs succeeded
    sendReply(client, m, "An error occurred while communicating with the APIs. Please try again later.");
  } catch (e) {
    sendReply(client, m, 'An error occurred while communicating with the APIs\n' + e);
  }
};
