module.exports = async (client, m, isBotAdmin, itsMe, isAdmin, Owner, body, antilink) => {
    
    if (body && body.includes('https') && m.isGroup && antilink === 'true' && !Owner && isBotAdmin && !isAdmin) {
        
        if (itsMe) return;

        const kid = m.sender; 

        
        await client.sendMessage(m.chat, {
            text: `@${kid.split("@")[0]}, do not send links!`,
            contextInfo: { mentionedJid: [kid] }
        }, { quoted: m });

        
        await client.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: kid
            }
        });

        
        await client.groupParticipantsUpdate(m.chat, [kid], 'remove');
    }
};
