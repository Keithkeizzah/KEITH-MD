const Heroku = require('heroku-client');
const herokuapi = process.env.API;
const appname = process.env.APPNAME || 'heroku-app-nsmw';

module.exports = async (context) => {
  const { m, text, prefix } = context;  // 'prefix' is used as varName now

  // Check if APPNAME or API is missing
  if (!appname || !herokuapi) {
    m.reply("Fill in the APPNAME and API environment variables");
    return;
  }

  // Ensure that 'text' is provided
  if (!text || text.length === 0) {
    m.reply(`Please provide a value for the environment variable "${prefix}"`);
    return;
  }

  // Ensure 'text' is treated as an array (in case it is not)
  const value = Array.isArray(text) ? text.join(" ") : text;

  // Create a Heroku client using the API token
  const heroku = new Heroku({ token: herokuapi });

  try {
    // Update the config-vars on Heroku
    await heroku.patch(`/apps/${appname}/config-vars`, {
      body: {
        [prefix]: value,  // Set the value for the varName (prefix)
      }
    });

    // Respond to the user
    m.reply(`The Heroku variable ${prefix} is changing. The bot is restarting...`);
  } catch (error) {
    // Handle any errors that occur during the API request
    m.reply(`Failed to update the Heroku variable. Error: ${error.message}`);
  }
};
