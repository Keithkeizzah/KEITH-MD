module.exports = async (context) => {
  try {
    const { client, m } = context;

    // Roll a dice (generate a random number between 1 and 6)
    const result = Math.floor(Math.random() * 6) + 1;
    
    // Send the result
    m.reply(`🎲 You rolled: *${result}*`);
  } catch (e) {
    console.error("Error in .roll command:", e);
    m.reply("❌ An error occurred while rolling the dice.");
  }
};
