const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, args, participants, text } = context;

        // Start composing the message
        let txt = `You have been tagged by ${m.pushName}.\n\nMessage: ${text ? text : 'No Message!'}\n\n`;

        // Loop through the participants and number them
        participants.forEach((mem, index) => {
            txt += `${index + 1}. 📧 @${mem.id.split('@')[0]}\n`;
        });

        // Send the message with mentions
        client.sendMessage(m.chat, { text: txt, mentions: participants.map(a => a.id) }, { quoted: m });
    });
};
