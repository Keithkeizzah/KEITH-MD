const fetch = require("node-fetch");
const fs = require('fs');

module.exports = async (context) => {
  const { client, m, text } = context;

  const apis = [
    `https://dark.guruapi.tech/egpt?prompt=${encodeURIComponent(text)}`,
    `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(text)}`,
    `https://api.gurusensei.workers.dev/llama?prompt=${encodeURIComponent(text)}`,
    `https://api.ryzendesu.vip/api/ai/v2/chatgpt?text=${encodeURIComponent(text)}`,
    `https://api.dreaded.site/api/chatgpt?text=${encodeURIComponent(text)}`,
    `https://api.giftedtech.my.id/api/ai/gpt4?apikey=gifted&q=${encodeURIComponent(text)}`,
    `https://api.giftedtech.my.id/api/ai/gpt4v2?apikey=gifted&q=${encodeURIComponent(text)}`,
    `https://api.giftedtech.my.id/api/ai/gpt4-o?apikey=gifted&q=${encodeURIComponent(text)}`
  ];

  
  let conversationData = [];
  try {
    const rawData = fs.readFileSync('store.json');
    conversationData = JSON.parse(rawData);
  } catch (err) {
    console.log('No previous conversation found, starting new one.');
  }

  const userMessage = { role: 'user', content: text };
  conversationData.push(userMessage);

  try {
    if (!text) return m.reply("hello how can i assist you today");

    for (const api of apis) {
      try {
        const data = await fetch(api);
        const msgg = await data.json();

        if (msgg.message || msgg.response || msgg.result) {
          const final = msgg.message || msgg.response?.response || msgg.result.prompt || msgg.result;
          const aiMessage = { role: 'assistant', content: final };
          conversationData.push(aiMessage);

          fs.writeFileSync('store.json', JSON.stringify(conversationData, null, 2));

          await m.reply(final);
          return;
        }
      } catch (e) {
        continue;
      }
    }

    m.reply("An error occurred while communicating with the APIs. Please try again later.");
  } catch (e) {
    m.reply('An error occurred while communicating with the APIs\n' + e);
  }
};
