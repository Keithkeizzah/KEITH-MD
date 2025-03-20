const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware'); 

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m, text, Owner, args } = context;

                 if (!text) return m.reply("provide a valid group link")
let result = args[0].split('https://chat.whatsapp.com/')[1]

try {
    const info = await client.groupGetInviteInfo(result);
    let { subject } = info;
} catch (error) {
    console.log("error")
}
     
    await client.groupAcceptInvite(result)
        .then(() => m.reply(`Bot has joined ${subject}`))
        .catch((res) => {
            if (res.data == 400) return m.reply('Group does not exist.');
            if (res.data == 401) return m.reply('Bot was previously removed, cannot join using link.');
            if (res.data == 409) return m.reply('Bot was already in the group, Uh?');
            if (res.data == 410) return m.reply('This group link is reset, provide a new one');
            if (res.data == 500) return m.reply('This group is full');
        });
            

             });
}
