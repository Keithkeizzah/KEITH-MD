const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, participants, text } = context;

        // Filter out the group admins
        const groupAdmins = participants.filter(mem => mem.admin).map(mem => mem.id);

        if (groupAdmins.length === 0) {
            return m.reply('_No admins found in the group._');
        }

        let txt = `You have been tagged by ${m.pushName}.\n\nMessage: ${text || 'No Message!'}\n\n`;

        // Add the admin tags to the message
        for (let admin of groupAdmins) {
            txt += `📧 @${admin.split('@')[0]}\n`;
        }

        // Send the message mentioning only the admins
        await client.sendMessage(m.chat, { text: txt, mentions: groupAdmins }, { quoted: m });
    });
};
