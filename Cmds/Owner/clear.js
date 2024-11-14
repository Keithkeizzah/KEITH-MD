const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    try {
        // Apply middleware
        await middleware(context);

        const { client, m } = context;

        // Clear the chat
        await client.clearChat(client.jid);

        // Send a response back
        m.reply('Chat cleared successfully.');
    } catch (error) {
        console.error('Error clearing chat:', error);
        const { m } = context;
        m.reply('An error occurred while clearing the chat.');
    }
};
