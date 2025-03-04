module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    if (!text) {
      return m.reply("✳️ Use this command like:\n *Example:* .calculate 5+3*2");
    }

    // Validate the input to prevent unsafe operations
    if (!/^[0-9+\-*/().\s]+$/.test(text)) {
      return m.reply("❎ Invalid expression. Only numbers and +, -, *, /, ( ) are allowed.");
    }

    // Evaluate the mathematical expression
    let result = eval(text);

    // Reply with the result
    m.reply(`✅ Result of "${text}" is: ${result}`);
  } catch (e) {
    console.error("Error in .calculate command:", e);
    m.reply("❎ Error in calculation. Please check your expression.");
  }
};
