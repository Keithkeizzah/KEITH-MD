module.exports = async (context) => {
    const { client, m, text } = context;


const { GiftedGpt } = require("gifted-gpt");
if (!text) return m.reply("provide text");

 (async () => { 

const gpt4 = new GiftedGpt();


const messages = [ { role: 'user', content: text }, { role: 'system', content: 'You are an assistant in WhatsApp. You are called Keith. You respond to user commands.' } ]; 

await m.reply(await GiftedGpt.generate(gpt4, messages)); 

})();


}
