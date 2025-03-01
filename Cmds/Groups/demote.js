const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, sendReply, sendMediaMessage } = context;

        if (!m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0)) {
            return sendReply(client, m, "You did not give me a user !?");
        }
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null;
        const parts = users.split('@')[0];

if (users == "254796299159@s.whatsapp.net") return sendReply(client, m, "It's Owner Number! 🦄");

                 await client.groupParticipantsUpdate(m.chat, [users], 'demote'); 

        sendReply(client, m, `${parts} is no longer an admin. 🎗️`); 

})

}
