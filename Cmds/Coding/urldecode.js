module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    if (!text) {
      return m.reply("❌ Please provide the URL encoded text to decode.");
    }

    // Decode the URL encoded text
    const decodedText = decodeURIComponent(text);

    // Send the decoded text
    m.reply(`🔓 *Decoded Text:* \n${decodedText}`);
  } catch (e) {
    console.error("Error in .urldecode command:", e);
    m.reply("❌ An error occurred while decoding the URL encoded text.");
  }
};
