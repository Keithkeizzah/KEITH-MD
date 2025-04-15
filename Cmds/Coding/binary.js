module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    if (!text) {
      return m.reply('Please provide a text to convert to binary.');
    }

    const binaryText = text.split('').map(char => {
      return `00000000${char.charCodeAt(0).toString(2)}`.slice(-8);
    }).join(' ');

    m.reply(`🔑 *Binary Representation:* \n${binaryText}`);
  } catch (e) {
    console.error("Error in .binary command:", e);
    m.reply("❌ An error occurred while converting to binary.");
  }
};
