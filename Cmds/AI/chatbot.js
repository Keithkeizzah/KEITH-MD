const fetch = require("node-fetch");  // Required for making API requests
const ownerMiddleware = require("../../utility/botUtil/Ownermiddleware");

let chatbotEnabled = false;
let chatbotInGroups = false;
let chatbotInInbox = false;

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, Owner, text, body, itsMe, IsGroup, isBotAdmin } = context;
    const toggle = text.trim().toLowerCase();

    try {
      // Handle the chatbot toggle commands
      if (toggle === "on") {
        chatbotEnabled = true;
        return m.reply("*Chatbot has been enabled globally (all chats)!*");
      } else if (toggle === "off") {
        chatbotEnabled = false;
        return m.reply("*Chatbot has been disabled globally (all chats)!*");
      } else if (toggle === "groups") {
        chatbotInGroups = true;
        chatbotInInbox = false;
        return m.reply("*Chatbot will work in groups only!*");
      } else if (toggle === "inbox") {
        chatbotInInbox = true;
        chatbotInGroups = false;
        return m.reply("*Chatbot will work in personal chats (inbox) only!*");
      } else {
        return m.reply("Use 'on', 'off', 'groups', or 'inbox' to enable/disable the chatbot.");
      }
    } catch (e) {
      console.log(e);
      return m.reply(`Error: ${e}`);
    }
  });

  // Handle the chat messages when the chatbot is enabled
  if (chatbotEnabled) {
    if (itsMe) return; // Ignore messages from the bot itself
    if ((chatbotInGroups && !IsGroup) || (chatbotInInbox && IsGroup)) {
      return; // Ignore messages based on chatbot settings
    }

    const query = body;  // Get the message body
    let data;

    try {
      // Try fetching responses from different APIs in sequence
      data = await getResponseFromAPI(query);
      if (data) {
        return client.sendMessage(m.chat, { text: data.result }, { quoted: m });
      }
    } catch (e) {
      console.log('API request failed:', e);
    }

    // If no response was found from APIs
    return m.reply("Sorry, I couldn't generate a response. Please try again later.");
  }
};

// Function to make API calls
async function getResponseFromAPI(query) {
  try {
    const apiUrl = `https://api.giftedtech.my.id/api/ai/gpt?apikey=gifted&q=${encodeURIComponent(query)}`;

    // Log the URL and query for debugging
    console.log(`Fetching data from: ${apiUrl}`);

    const res = await fetch(apiUrl);

    // Ensure the response is successful (status code 200)
    if (!res.ok) {
      throw new Error(`API request failed with status: ${res.status}`);
    }

    const data = await res.json();

    // Check if the response has the expected structure
    if (data && data.result) {
      return data;  // Return the result if it exists
    } else {
      throw new Error("API response does not contain expected data");
    }
  } catch (e) {
    // Log the error for debugging
    console.log("Error fetching data from API:", e);
    return null;
  }
}
