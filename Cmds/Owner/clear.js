const middleware = require('../../utility/botUtil/middleware'); // Make sure this path is correct

module.exports = async (context) => {
    try {
        // Apply middleware to the context
        await middleware(context, async () => {
            const { client, m } = context;

            // Check if the message and chat are valid
            if (!m || !m.chat || !m.chat.jid) {
                return m.reply('Invalid chat or message data.');
            }

            // Clear the chat using the client's clearChat method
            await client.clearChat(m.chat.jid);

            // Respond to the user
            m.reply('Chat cleared.');
        });
    } catch (error) {
        // Log and reply with an error message if something goes wrong
        console.error('Error clearing chat:', error);
        if (context.m) {
            context.m.reply('An error occurred while clearing the chat.');
        }
    }
};
