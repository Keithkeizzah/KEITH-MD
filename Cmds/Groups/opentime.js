const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    try {
        await middleware(context, async () => {
            const { client, m, args, botname } = context;

            let timer;
            
            // Check if the time unit and value are valid
            if (!args[0] || !args[1]) {
                return m.reply('Please provide both a time value and a time unit.\nExample: 10 second');
            }

            // Determine the time duration based on the provided unit
            if (args[1] === 'second') {
                timer = args[0] * 1000;
            } else if (args[1] === 'minute') {
                timer = args[0] * 60000;
            } else if (args[1] === 'hour') {
                timer = args[0] * 3600000;
            } else if (args[1] === 'day') {
                timer = args[0] * 86400000;
            } else {
                return m.reply('Please select a valid time unit: second, minute, hour, or day.\nExample: 10 second');
            }

            // Reply to the user with the countdown information
            m.reply(`Open time of ${args[0]} ${args[1]} starting from now...`);

            // Set a timeout to change group settings after the specified time
            setTimeout(() => {
                const openMessage = `*⏰ Open Time 🗿*\nGroup was opened by ${botname} . Now all members can send messages.`;
                client.groupSettingUpdate(m.chat, 'not_announcement');
                m.reply(openMessage);
            }, timer);

            // React with a checkmark emoji after processing the command
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        });
    } catch (e) {
        console.error(e);
        m.reply('An error occurred!');
    }
};

