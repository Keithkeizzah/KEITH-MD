const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    // Apply middleware to the context
    await middleware(context, async () => {
        const { client, m } = context;

        // Ensure `client` is the correct object and `m` is the message object
        if (!client || !m) {
            return m.reply("An error occurred. Please try again.");
        }

        // Turn off disappearing messages for the group
        try {
            await client.groupToggleEphemeral(context.bot, 0); // Ensure `context.bot` is correct here
            m.reply('Disappearing messages successfully turned off!');
        } catch (error) {
            console.error('Error turning off disappearing messages:', error);
            m.reply('Failed to turn off disappearing messages. Please try again later.');
        }
    });
};
