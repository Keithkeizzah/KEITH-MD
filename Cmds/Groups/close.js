const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, sendReply, sendMediaMessage } = context;

        await client.groupSettingUpdate(m.chat, 'announcement');
        sendReply(client, m, 'Group closed.');
    });
};
