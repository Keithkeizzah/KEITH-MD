module.exports = async (context) => {
  try {
    const { client, m } = context;

    // Simulate coin flip (randomly choose Heads or Tails)
    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    
    // Send the result
    m.reply(`🪙 Coin Flip Result: *${result}*`);
  } catch (e) {
    console.error("Error in .coinflip command:", e);
    m.reply("❌ An error occurred while flipping the coin.");
  }
};
