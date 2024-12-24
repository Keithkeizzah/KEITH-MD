const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;

        await client.groupToggleEphemeral(m.chat, 604800);
        m.reply('Disappearing messages successfully turned on for 7 days.');
    });
};
