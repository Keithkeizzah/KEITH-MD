const Heroku = require('heroku-client');

module.exports = async (context) => {
  const { m, herokuapikey, herokuAppname } = context;

  const heroku = new Heroku({
    token: herokuapikey,
  });

  const baseURI = `/apps/${herokuAppname}/config-vars`;

  try {
    // Fetch config vars from Heroku API
    let configVars = await heroku.get(baseURI);

    let str = '*╭───༺All my Heroku vars༻────╮*\n\n';
    
    // Loop through the returned config vars and format them
    for (let key in configVars) {
      if (configVars.hasOwnProperty(key)) {
        str += `★ *${key}* = ${configVars[key]}\n`;
      }
    }

    // Send the formatted response back to the user
    m.reply(str);

  } catch (error) {
    console.error('Error fetching Heroku config vars:', error);
    m.reply('Sorry, there was an error fetching the config vars.');
  }
};
