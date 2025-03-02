const fetch = require("node-fetch");

module.exports = async (context) => {
  const { client, m, text, sendReply, sendMediaMessage } = context;

  const apis = [
    `https://dark.guruapi.tech/egpt?prompt=${encodeURIComponent(text)}`,
   // `https://api.siputzx.my.id/api/ai/deepseek?prompt=You%20are%20an%20assistant%20that%20always%20responds%20in%20Indonesian%20with%20a%20friendly%20and%20informal%20tone&message=${encodeURIComponent(text)}`,
    `https://api.siputzx.my.id/api/ai/deepseek-llm-67b-chat?content=${encodeURIComponent(text)}`,
    `https://apis.davidcyriltech.my.id/ai/deepseek-v3?text=${encodeURIComponent(text)}`,
    `https://apis.davidcyriltech.my.id/ai/deepseek-r1?text=${encodeURIComponent(text)}`,
    `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(text)}`
  ];

  try {
    if (!text) return sendReply(client, m, "I am an ai how can i assist you today");

    for (const api of apis) {
      try {
        const data = await fetch(api);
        const msgg = await data.json();

        // Checking if the API response is successful
        if (msgg.message || msgg.data || msgg.answer) {
          const final = msgg.message || msgg.data || msgg.answer;
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
