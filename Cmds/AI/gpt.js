const fetch = require("node-fetch");

module.exports = async (context) => {
  const { client, m, text, author, sendReply, sendMediaMessage } = context;

  const apis = [
    `https://vapis.my.id/api/openai?q=${encodeURIComponent(text)}`,
    `https://vapis.my.id/api/gpt4o?q=${encodeURIComponent(text)}`,
    `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(text)}`,
    `https://api.gurusensei.workers.dev/llama?prompt=${encodeURIComponent(text)}`,
    `https://api.ryzendesu.vip/api/ai/v2/chatgpt?text=${encodeURIComponent(text)}`,
    `https://api.dreaded.site/api/chatgpt?text=${encodeURIComponent(text)}`,
    `https://api.giftedtech.my.id/api/ai/gpt4?apikey=gifted&q=${encodeURIComponent(text)}`,
    `https://api.giftedtech.my.id/api/ai/gpt4v2?apikey=gifted&q=${encodeURIComponent(text)}`,
    `https://api.giftedtech.my.id/api/ai/gpt4-o?apikey=gifted&q=${encodeURIComponent(text)}`
  ];

  try {
    if (!text) return sendReply(client, m, "I am  an AI based on the model developed by Keith  how can i assist you today ☺️ ");

    for (const api of apis) {
      try {
        const data = await fetch(api);
        const msgg = await data.json();

        
        if (msgg.message || msgg.response || msgg.result) {
          const final = msgg.message || msgg.response?.response || msgg.result.prompt || msgg.result;
          await sendReply(client, m, final);
          return;
        }
      } catch (e) {
        
        continue;
      }
    }

    
    sendReply(client, m, "An error occurred while communicating with the APIs. Please try again later.");
  } catch (e) {
    sendReply(client, m, 'An error occurred while communicating with the APIs\n' + e);
  }
};
