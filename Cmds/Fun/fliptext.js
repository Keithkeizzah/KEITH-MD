module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    if (!text) {
      return m.reply("❌ Please provide the text to flip.");
    }

    // Flip the text
    const flippedText = text.split('').reverse().join('');
    
    // Send the flipped text
    m.reply(`🔄 Flipped Text: *${flippedText}*`);
  } catch (e) {
    console.error("Error in .flip command:", e);
    m.reply("❌ An error occurred while flipping the text.");
  }
};
