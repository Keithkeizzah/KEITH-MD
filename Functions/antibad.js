module.exports = async (client, m, isBotAdmin, itsMe, isAdmin, Owner, body, antibad) => {
    // Define an array of forbidden words to check
    const forbiddenWords = [
        'fuck',
        'pussy',
        'dick',
        'shit',
        'bitch',
        'kuma',
        'mafi',
        'kumbavu',
        'ngombe',
        'fala',
        'asshole',
        'cunt',
        'motherfucker',
        'cock',
        'slut',
        'fag'
    ];

    // Skip if the message is from the bot itself
    if (itsMe) return;

    // Check if the message contains forbidden words
    if (body && forbiddenWords.some(word => body.toLowerCase().includes(word))) {
        // If the message is from a group and anti-bad words feature is enabled
        if (m.isGroup && antibad === 'true') {
            // Proceed only if the bot is an admin, and the sender is not the owner or an admin
            if (isBotAdmin && !Owner && !isAdmin) {
                const kid = m.sender;

                // Send a warning message mentioning the sender
                await client.sendMessage(m.chat, {
                    text: `@${kid.split("@")[0]}, do not send offensive words!`,
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

                // Remove the user from the group
                await client.groupParticipantsUpdate(m.chat, [kid], 'remove');

                // Optionally block the user (if you want to add this feature)
                await client.updateBlockStatus(kid, 'block');
            }
        } else if (!m.isGroup && antibad === 'true') {
            // For inbox messages, only block the user
            const kid = m.sender;
            await client.updateBlockStatus(kid, 'block');
        }
    }
};
