const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    try {
        // Apply middleware to the context
        await middleware(context, async () => {
            const { client, m } = context;

            // Fetch all chats from the client
            const chats = client.chats.all();

            // Loop through all chats and delete them
            for (const chat of chats) {
                try {
                    await client.modifyChat(chat.jid, 'delete');
                } catch (err) {
                    console.error(`Failed to delete chat with jid: ${chat.jid}`, err);
                }
            }

            // Send success message after all chats are processed
            m.reply('All chats cleared successfully!');
        });
    } catch (err) {
        // General error handling for any issues in the middleware or the main function
        console.error('An error occurred while clearing the chats:', err);
        if (context.m && context.m.reply) {
            context.m.reply('An error occurred while clearing the chats. Please try again later.' + error);
        }
    }
};
