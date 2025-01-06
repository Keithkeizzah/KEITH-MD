module.exports = async (context) => {

const ownerMiddleware = require('../../Middleware/ownerMiddleware');

    await ownerMiddleware(context, async () => {

    const { client, m, text} = context;

if (!text) {
      m.reply("Provide a setting to be updated. Example:\nonline all");
      return;
    }


const availablepriv = ['all', 'match_last_seen'];

if (!availablepriv.includes(text)) return m.reply(`Choose a setting from this list: ${availablepriv.join('/')}`);

await client.updateOnlinePrivacy(text)
        await m.reply(`Online privacy settings updated to *${text}*`);

})

}
