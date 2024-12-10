module.exports = async (client, m, isBotAdmin, itsMe, isAdmin, Owner, body, antilink) => {
    // Check if the message contains a link and the group has anti-link enabled
    if (body && body.includes('chat.whatsapp.com') && m.isGroup && antilink === 'true' && !Owner && isBotAdmin && !isAdmin) {
        // Prevent the bot from acting if the message is sent by the bot itself
        if (itsMe) return;

        const kid = m.sender; // Get the sender of the message

        // Send a warning message to the user who sent the link
        await client.sendMessage(m.chat, {
            text: `@${kid.split("@")[0]}, do not send links!`,
            contextInfo: { mentionedJid: [kid] }
        }, { quoted: m });

        // Delete the message with the invite link
        await client.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: kid
            }
        });

        // Remove the participant who sent the link from the group
        await client.groupParticipantsUpdate(m.chat, [kid], 'remove');
    }
};
