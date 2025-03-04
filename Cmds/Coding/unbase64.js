module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    if (!text) {
      return m.reply("❌ Please provide the Base64 encoded text to decode.");
    }

    // Decode the Base64 text
    const decodedText = Buffer.from(text, 'base64').toString('utf-8');
    
    // Send the decoded text
    m.reply(`🔓 *Decoded Text:* \n${decodedText}`);
  } catch (e) {
    console.error("Error in .unbase64 command:", e);
    m.reply("❌ An error occurred while decoding the Base64 text.");
  }
};
