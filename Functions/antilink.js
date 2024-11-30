module.exports = async (client, m, isBotAdmin, isAdmin, Owner, body) => {
    if (body && body.includes('chat.whatsapp.com') && !Owner && isBotAdmin && !isAdmin && m.isGroup) {

m.reply("Group link detected");
        const kid = m.sender;
        await client.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: kid
            }
        });
        await client.groupParticipantsUpdate(m.chat, [kid], 'remove');
        await client.sendMessage(m.chat, {
            text: `Removed!\n\n@${kid.split("@")[0]} sending group links is prohibited!`,
            contextInfo: {
                mentionedJid: [kid]
            }
        }, { quoted: m });
    }
};