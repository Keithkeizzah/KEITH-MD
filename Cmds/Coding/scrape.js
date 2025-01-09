const ownerMiddleware = require('../../Middleware/ownerMiddleware'); 

module.exports = async (context) => {
  const { 
    m, text
  } = context;

  try {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return m.reply("No command provided for eval!");
    }

    let evaled = await eval(trimmedText);

    if (typeof evaled !== 'string') {
      evaled = require('util').inspect(evaled);
    }

    await m.reply(evaled);

  } catch (err) {
    await m.reply("Error during eval execution:\n" + String(err));
  }
};
