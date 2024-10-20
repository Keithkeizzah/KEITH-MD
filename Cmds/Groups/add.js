const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, participants, botname, groupMetadata, text, pushname } = context;

        const { getBinaryNodeChild, getBinaryNodeChildren } = require('@whiskeysockets/baileys');

        if (!text) return m.reply("provide number to be added in this format.\n\nadd 254114018035");

        const _participants = participants.map((user) => user.id);

        const users = (await Promise.all(
            text.split(',')
                .map((v) => v.replace(/[^0-9]/g, ''))
                .filter((v) => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
                .map(async (v) => [
                    v,
                    await client.onWhatsApp(v + '@s.whatsapp.net'),
                ]),
        )).filter((v) => v[1][0]?.exists).map((v) => v[0] + '@c.us');

        const response = await client.query({
            tag: 'iq',
            attrs: {
                type: 'set',
                xmlns: 'w:g2',
                to: m.chat,
            },
            content: users.map((jid) => ({
                tag: 'add',
                attrs: {},
                content: [{ tag: 'participant', attrs: { jid } }],
            })),
        });

        

        

        const add = getBinaryNodeChild(response, 'add');
        const participant = getBinaryNodeChildren(add, 'participant');

        let respon = await client.groupInviteCode(m.chat);

        

for (const user of participant.filter((item) => item.attrs.error === 401 || item.attrs.error === 403 || item.attrs.error === 408)) {
    const jid = user.attrs.jid;
    const content = getBinaryNodeChild(user, 'add_request');
    const invite_code = content.attrs.code;
    const invite_code_exp = content.attrs.expiration;

    let teza;
    if (user.attrs.error === 401) {
        teza = `@${jid.split('@')[0]} has blocked the bot.`;
    } else if (user.attrs.error === 403) {
        teza = `@${jid.split('@')[0]} has set privacy settings for group adding.`;
    } else if (user.attrs.error === 408) {
        teza = `@${jid.split('@')[0]} recently left the group.`;
    } 

    await m.reply(teza);

    let links = `${pushname} is trying to add or request you to join the group ${groupMetadata.subject}:\n\nhttps://chat.whatsapp.com/${respon}\n\n${botname} 🤖`;

    await client.sendMessage(jid, { text: links }, { quoted: m });
}
    });
};