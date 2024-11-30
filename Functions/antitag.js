module.exports = async (client, m, isBotAdmin, itsMe, isAdmin, Owner, body, antitag) => {


if (m.isGroup && antitag === 'true' && !Owner && isBotAdmin && !isAdmin && m.mentionedJid && m.mentionedJid.length > 10) {
if (itsMe) return;
const kid = m.sender;

await client.sendMessage(m.chat, {text:`@${kid.split("@")[0]}, do not tag!`, contextInfo:{mentionedJid:[kid]}}, {quoted:m}); 

        
        await client.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: kid
            }
        });


await client.groupParticipantsUpdate(m.chat, [kid], 'remove')



}

}