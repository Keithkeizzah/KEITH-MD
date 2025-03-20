module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    if (!text.includes(',')) {
      return m.reply("❌ Please provide two choices to pick from. Example: `.pick Ice Cream, Pizza`");
    }

    // Pick a random option
    const options = text.split(',').map(option => option.trim());
    const choice = options[Math.floor(Math.random() * options.length)];

    // Send the result
    m.reply(`🎉 Bot picks: *${choice}*`);
  } catch (e) {
    console.error("Error in .pick command:", e);
    m.reply("❌ An error occurred while processing your request.");
  }
};
