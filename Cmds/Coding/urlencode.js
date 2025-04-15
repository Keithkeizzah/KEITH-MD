module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    if (!text) {
      return m.reply("❌ Please provide the text to encode into URL encoding.");
    }

    // Encode the text into URL encoding
    const encodedText = encodeURIComponent(text);

    // Send the encoded URL text
    m.reply(`🔑 *Encoded URL Text:* \n${encodedText}`);
  } catch (e) {
    console.error("Error in .urlencode command:", e);
    m.reply("❌ An error occurred while encoding the text.");
  }
};
