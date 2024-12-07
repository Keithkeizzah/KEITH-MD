const middleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, text, message } = context;

        // Check if there's text and if it's sufficient
        if (!text || text.split(' ').length < 5) {
            return m.reply('```Please provide a detailed description of the issue. The message should be at least 5 words long.```');
        }

        // The text that the user wants to report
        const bugMessage = text;

        // Developer chat IDs
        const devs = ['254748387615', '254796299159', '2254110190196', '254743995989'];

        // Format the error report
        const errorReport = `\`\`\`
REPORT
FROM: @${message.sender.username || message.sender.split('@')[0]}  // Ensure username is fetched correctly
MESSAGE: \n${bugMessage}
\`\`\``;

        // Send the bug report to each developer
        for (const dev of devs) {
            try {
                await m.reply(errorReport, { chat: dev, mentions: [message.sender] });
            } catch (err) {
                console.error(`Failed to send bug report to developer ${dev}:`, err);
            }
        }
    });
};
