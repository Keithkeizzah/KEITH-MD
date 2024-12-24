const middleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;

        await client.rPP( );
        m.reply('profile picture removed.');
    });
};
