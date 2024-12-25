const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    try {
        await middleware(context, async () => {
            const { client, m, args, text, botname } = context;

            // Check if args[0] and args[1] are provided
            if (!args[0] || !args[1]) {
                return m.reply('Please provide the time duration and unit (e.g., 10 second, 5 minute, etc.).');
            }

            let timer;

            // Determine the time in milliseconds based on the unit provided
            switch (args[1].toLowerCase()) {
                case 'second':
                    timer = args[0] * 1000;
                    break;
                case 'minute':
                    timer = args[0] * 60000;
                    break;
                case 'hour':
                    timer = args[0] * 3600000;
                    break;
                case 'day':
                    timer = args[0] * 86400000;
                    break;
                default:
                    return m.reply('Please select a valid time unit: second, minute, hour, or day. Example: 10 second');
            }

            // Notify that the timer has started
            m.reply(`Close time of "${text}" starting from now...`);

            // Set the timeout for closing the group
            setTimeout(() => {
                const closeMessage = `*⏰ Close Time 🗿*\nThe group has been successfully closed by ${botname}.`;
                client.groupSettingUpdate(m.chat, 'announcement');
                m.reply(closeMessage);
            }, timer);

            // Send a reaction to confirm the operation
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

        });
    } catch (error) {
        console.error(error);
        m.reply('An error occurred while processing your request.');
    }
};
