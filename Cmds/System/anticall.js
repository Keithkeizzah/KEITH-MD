const Heroku = require('heroku-client');
const herokuapi = process.env.API;
const anticall = process.env.ANTICALL || 'heroku-app-nsmw';

module.exports = async (context) => {
  const { m, text, prefix } = context;

  // Split the input by spaces and check if it follows the correct format
  const input = text.split(' ');

  // Check if the input length is correct and command is 'anticall'
  if (input.length !== 2 || input[0].toLowerCase() !== 'anticall') {
    return m.reply(`⚠️ Please use the correct format: ${prefix}anticall <true|false>\nFor example: ${prefix}anticall true`);
  }

  const [command, value] = input;

  // Ensure the value is either 'true' or 'false'
  if (value !== 'true' && value !== 'false') {
    return m.reply(`❌ The value must be either 'true' or 'false'.\nFor example: ${prefix}anticall true or ${prefix}anticall false`);
  }

  // Initialize Heroku client
  const herok = new Heroku({
    token: herokuapi,
  });

  const baseURI = `/apps/${anticall}/config-vars`;

  try {
    // Update the config variable with the value 'true' or 'false'
    await herok.patch(baseURI, {
      body: {
        ANTICALL: value,  // Set the config variable
      },
    });

    // Inform the user that the variable has been updated
    await m.reply(`✅ The ANTICALL variable has been set to ${value} successfully.\nBot is restarting...`);
  } catch (error) {
    console.error('Error setting config variable:', error);
    await m.reply(`❌ There was an error setting the ANTICALL variable. Please try again later.\nError: ${error.message}`);
  }
};
