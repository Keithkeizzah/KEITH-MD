const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, sendReply, sendMediaMessage } = context;

        await client.groupToggleEphemeral(m.chat, 86400);
        sendReply(client, m, 'Disappearing messages successfully turned on for 24 hours.');
    });
};
