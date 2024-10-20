const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, args, participants, text } = context;


let txt = `You have been tagged by ${m.pushName}.
   
  Message:- ${text ? text : 'No Message!'}\n\n`; 
                 for (let mem of participants) { 
                 txt += `📧 @${mem.id.split('@')[0]}\n`; 
                 } 
                 client.sendMessage(m.chat, { text: txt, mentions: participants.map(a => a.id) }, { quoted: m }); 

})

}