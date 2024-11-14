const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    try {
        // Apply middleware to the context
        await middleware(context, async () => {
            const { client, m } = context;

            // Check if client.chats is available
            if (!client.chats || typeof client.chats.all !== 'function') {
                console.error('client.chats is not available or does not have an "all" method');
                return m.reply('Could not retrieve chats. Please try again later.');
            }

            // Fetch all chats from the client
            const chats = await client.chats.all();

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

        // Send a failure message to the user
        return m.reply('An error occurred while clearing the chats. Please try again later.');
    }
};
