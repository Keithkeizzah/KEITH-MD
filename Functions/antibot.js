module.exports = async (client, m, isBotAdmin, itsMe, isAdmin, Owner, body, antibot, isBotMessage, message) => {
    if (m.isGroup && antibot === 'true' && !Owner && message && isBotMessage && isBotAdmin && !isAdmin && m.mentionedJid && m.mentionedJid.length > 10) {
        if (itsMe) return;
        
        const kid = m.sender;

        // Check if the message starts with 'BAE' (could be an ID for a bot message)
        if (message.id.startsWith("QUEENAMDI")) {
            // Send notification to the group that a bot message was detected
            const notification = {
                text: "_Antibot detectected by Keith md ,,removal done_"
            };

            // Send notification message to the group
            await client.sendMessage(m.chat, notification);

            // Delete the message
            await client.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id
                }
            });

            // Remove the bot from the group
            await client.groupParticipantsUpdate(m.chat, [kid], 'remove');
        }
    }
};
