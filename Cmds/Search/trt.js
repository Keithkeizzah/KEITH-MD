const axios = require('axios');
const translatte = require('translatte');

module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    // Check if the message is quoted
    if (!m.quoted) {
      return m.reply("❌ Please quote a message to translate.");
    }

    // Extract the language code from the text
    const langCode = text.trim();

    // Check if a valid language code is provided
    if (!langCode) {
      return m.reply("❌ Please provide a valid language code. Example: `.translate en` or use .langcode to list all language codes");
    }

    // Get the quoted message
    const quotedMessage = m.quoted.text;

    // Translate the quoted message
    const translation = await translatte(quotedMessage, { to: langCode });

    // Send the translated message
    m.reply(`🔤 *Translated Text:* \n${translation.text}`);
  } catch (e) {
    console.error("Error in .translate command:", e);
    m.reply("❌ An error occurred while translating the text. Please try again later.");
  }
};
