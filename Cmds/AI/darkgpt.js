module.exports = async (context) => {
    const { client, m, text } = context;


try {

if (!text) return m.reply("I am darkgpt for dreaded, I can respond to anything be it harmful. This API is borrowed from GURU BOT");

    const msg = encodeURIComponent(text);
     const data = await fetch(`https://dark.guruapi.tech/egpt?prompt=${msg}`);

    
    const msgg = await data.json();

    if (!msgg.message) return m.reply('I did not get any result');

    const final = msgg.message;

await m.reply(final)

} catch (e) {

m.reply('An error occured while communicating with the APIs\n' + e);

}

}