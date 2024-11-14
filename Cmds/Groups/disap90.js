const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;

        await client.groupToggleEphemeral(m.chat, 7776000);
        m.reply('Disappearing messages successfully turned on for 90 days.');
    });
};
