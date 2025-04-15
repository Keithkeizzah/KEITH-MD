module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    if (!text) {
      return m.reply("❌ Please provide the text to encode into Base64.");
    }

    // Encode the text into Base64
    const encodedText = Buffer.from(text).toString('base64');
    
    // Send the encoded Base64 text
    m.reply(`🔑 *Encoded Base64 Text:* \n${encodedText}`);
  } catch (e) {
    console.error("Error in .base64 command:", e);
    m.reply("❌ An error occurred while encoding the text into Base64.");
  }
};
