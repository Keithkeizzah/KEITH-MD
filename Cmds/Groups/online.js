const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, participants, text } = context;

        // Get online members by checking their presence status
        const onlineMembers = [];

        // Loop through the participants and check their presence
        for (let participant of participants) {
            const presence = await client.getPresence(participant.id._serialized); // Get presence status
            if (presence && presence.status === 'online') {
                onlineMembers.push(participant.id.user); // Add user if they're online
            }
        }

        if (onlineMembers.length === 0) {
            return m.reply('_No online members_');
        }

        let txt = `You have been tagged by ${m.pushName}.\n\nMessage: ${text || 'No Message!'}\n\n`;

        // Add the online members' tags to the message
        for (let member of onlineMembers) {
            txt += `📧 @${member}\n`;
        }

        // Send the message mentioning only the online members
        await client.sendMessage(m.chat, { text: txt, mentions: onlineMembers }, { quoted: m });
    });
};
