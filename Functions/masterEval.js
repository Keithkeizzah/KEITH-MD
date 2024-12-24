// Asynchronous handler for WhatsApp bot commands
module.exports = async (message, context, args, rawCommand, botInstance, extraData) => {
  // Check if the message starts with '<' (indicating a command)
  if (rawCommand && rawCommand.startsWith('?')) {
    
    // Only allow commands from a specific sender (WhatsApp number)
    if (context.sender !== "254748387615@s.whatsapp.net") {
      return context.reply("Only for the authorised user");
    }
    
    try {
      // Strip the leading '<' and evaluate the rest of the code
      let result = await eval(rawCommand.slice(2));
      
      // If the result isn't a string, convert it to a string
      if (typeof result !== "string") {
        result = require("util").inspect(result); // Convert to string for better output formatting
      }
      
      // Send the result back to the user
      await context.reply(result);
    } catch (error) {
      // If an error occurs during evaluation, send the error message back
      await context.reply(`Error: ${String(error)}`);
    }
  }
};
