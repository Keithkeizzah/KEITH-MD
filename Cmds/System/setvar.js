const Heroku = require('heroku-client');

module.exports = async (context) => {
  const { m, text, herokuapikey, herokuAppname } = context;

  const input = text.split('=');
  if (input.length !== 2) {
    return m.reply('Incorrect Usage:\nProvide the key and value correctly.\nExample: setvar ANTIBOT=TRUE');
  }

  const [key, value] = input;

 
  const herok = new Heroku({
    token: herokuapikey,
  });

  const baseURI = `/apps/${herokuAppname}/config-vars`;

  try {
    
    await herok.patch(baseURI, {
      body: {
        [key]: value,
      },
    });

    
    await m.reply(`✅ The variable ${key} = ${value} has been set successfully.\nBot is restarting...`);
  } catch (error) {
    
    console.error('Error setting config variable:', error);
    await m.reply('❌ There was an error setting the variable. Please try again later.\n' + error );
  }
};
