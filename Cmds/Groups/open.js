const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;

        await client.groupSettingUpdate(m.chat, 'not_announcement');
        m.reply('Group opened.');
    });
};