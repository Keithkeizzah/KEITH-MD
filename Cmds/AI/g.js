const fetch = require("node-fetch");
const fs = require('fs');

module.exports = async (context) => {
  const { client, m, text } = context;

  if (!text) return m.reply("Hello, how can I assist you today?");

  // Load previous conversation from store.json, if exists
  let conversationData = [];
  try {
    const rawData = fs.readFileSync('store.json');
    conversationData = JSON.parse(rawData);
  } catch (err) {
    console.log('No previous conversation found, starting new one.');
  }

  // Add user input to the conversation data
  const userMessage = { role: 'user', content: text };
  conversationData.push(userMessage);

  // Define the list of APIs to be called
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

  try {
    // Loop through APIs to get the AI response
    for (const api of apis) {
      try {
        const data = await fetch(api);
        const msgg = await data.json();

        if (msgg.message || msgg.response || msgg.result) {
          const final = msgg.message || msgg.response?.response || msgg.result.prompt || msgg.result;

          // Add AI response to the conversation data
          const aiMessage = { role: 'assistant', content: final };
          conversationData.push(aiMessage);

          // Write the updated conversation data to store.json
          fs.writeFileSync('store.json', JSON.stringify(conversationData, null, 2));

          // Reply to the user with the AI response
          await m.reply(final);
          return;
        }
      } catch (e) {
        continue; // Continue to the next API if one fails
      }
    }

    m.reply("An error occurred while communicating with the APIs. Please try again later.");
  } catch (e) {
    m.reply('An error occurred while processing your request.\n' + e);
  }
};
