module.exports = async (context) => {
    const { client, m, text } = context;


const ai = require('unlimited-ai');
if (!text) return m.reply("provide text");

 (async () => { 

const model = 'gpt-4'; 


const messages = [ { role: 'user', content: text }, { role: 'system', content: 'You are an assistant in WhatsApp. You are called Keith. You respond to user commands.' } ]; 

await m.reply(await ai.generate(model, messages)); 

})();


}
