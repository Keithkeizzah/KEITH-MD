module.exports = async (client, m, isBotAdmin, itsMe, isAdmin, Owner, body, antilink) => {
    // Define an array of URLs to check for
    const forbiddenLinks = [
        't.me',
        'whatsapp.com'
    ];

    // Check if the message contains any forbidden link, group settings allow link removal, and user is not admin
    if (body && forbiddenLinks.some(link => body.includes(link)) && m.isGroup && antilink === 'true' && !Owner && isBotAdmin && !isAdmin) {
        if (itsMe) return;  // Skip if the message is from the bot

        const kid = m.sender;

        // Notify the user that they are not allowed to send links
        await client.sendMessage(m.chat, {
            text: `@${kid.split("@")[0]}, do not send links!`,
            contextInfo: { mentionedJid: [kid] }
        }, { quoted: m });

        // Delete the offending message
        await client.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: kid
            }
        });

        if (!isBotAdmin) {
           
            await client.sendMessage(m.chat, {
                text: 'Please promote me to an admin to be able to remove link senders from the group.',
            });
        } else {
         
            await client.groupParticipantsUpdate(m.chat, [kid], 'remove');
        }
    }
};
