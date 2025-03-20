const fetch = require("node-fetch");

module.exports = async (context) => {
  const { client, m, text, sendReply, sendMediaMessage } = context;

  const apis = [
    `https://vapis.my.id/api/gemini?q=${encodeURIComponent(text)}`,
    `https://api.siputzx.my.id/api/ai/gemini-pro?content=${encodeURIComponent(text)}`,
    `https://api.ryzendesu.vip/api/ai/gemini?text=${encodeURIComponent(text)}`,
    `https://api.dreaded.site/api/gemini2?text=${encodeURIComponent(text)}`,
    `https://api.giftedtech.my.id/api/ai/geminiai?apikey=gifted&q=${encodeURIComponent(text)}`,
    `https://api.giftedtech.my.id/api/ai/geminiaipro?apikey=gifted&q=${encodeURIComponent(text)}`
  ];

  try {
    if (!text) return sendReply(client, m, "provide a text ");

    for (const api of apis) {
      try {
        const data = await fetch(api);
        const msgg = await data.json();

        // Checking if the API response is successful
        if (msgg.message || msgg.data || msgg.answer || msgg.result) {
          const final = msgg.message || msgg.data || msgg.answer || msgg.result;
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
