const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    try {
        await middleware(context, async () => {
            const { client, m, args, text, botname, sendReply, sendMediaMessage } = context;

            // Check if args[0] and args[1] are provided
            if (!args[0] || !args[1]) {
                return sendReply(client, m, 'Please provide the time duration and unit (e.g., 10 second, 5 minute, etc.).');
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
                    return sendReply(client, m, 'Please select a valid time unit: second, minute, hour, or day. Example: 10 second');
            }

            // Notify that the timer has started
            sendReply(client, m, `Close time of "${text}" starting from now...`);

            // Set the timeout for closing the group
            setTimeout(() => {
                const closeMessage = `*⏰ Close Time 🗿*\nThe group has been successfully closed by ${botname}.`;
                client.groupSettingUpdate(m.chat, 'announcement');
                sendReply(client, m, closeMessage);
            }, timer);

            // Send a reaction to confirm the operation
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

        });
    } catch (error) {
        console.error(error);
        sendReply(client, m, 'An error occurred while processing your request.');
    }
};
