const middleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;

        // Using the correct method for clearing chats
        await client.chatClear(m.chat, {
            exclude: ['not_announcement'], // Example option, adjust as needed
        });

        m.reply('Chats cleared.');
    });
};
