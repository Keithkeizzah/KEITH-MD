const fetch = require("node-fetch");

module.exports = async (context) => {
  const { client, m, text, sendReply, sendMediaMessage } = context;

  const apis = [
    `https://dark.guruapi.tech/egpt?prompt=${encodeURIComponent(text)}`,
    `https://vapis.my.id/api/Ilamav2?q=${encodeURIComponent(text)}`,
    `https://api.siputzx.my.id/api/ai/meta-llama-33-70B-instruct-turbo?content=${encodeURIComponent(text)}`,
    `https://apis.davidcyriltech.my.id/ai/llama3?text=${encodeURIComponent(text)}`
  ];

  try {
    if (!text) return sendReply(client, m, "provide query uhh??!");

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
