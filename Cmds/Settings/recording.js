const Heroku = require('heroku-client');

module.exports = async (context) => {
  const { m, text, herokuapikey, herokuAppname } = context;

 
  const input = text.split('=');

  let key, value;

  if (input.length === 1) {
   
    key = 'RECORDING';
    value = input[0].trim(); 
  } else if (input.length === 2) {
    
    [key, value] = input.map((str) => str.trim()); 
  } else {
  
    return m.reply(
      'Incorrect Usage:\nProvide the key and value correctly.\nExample:\n.setvar ANTIBOT=TRUE\nOr to set AUTOREAD directly:\n.setvar true'
    );
  }

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

 
    await m.reply(
      `✅ The variable ${key} = ${value} has been set successfully.\nBot is restarting...`
    );
  } catch (error) {
    
    console.error('Error setting config variable:', error);
    await m.reply(
      '❌ There was an error setting the variable. Please try again later.\n' +
        error
    );
  }
};
