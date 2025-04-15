const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, sendReply, sendMediaMessage } = context;

        await client.groupToggleEphemeral(m.chat, 0);
        sendReply(client, m, 'Disappearing messages successfully turned off!');
    });
};
