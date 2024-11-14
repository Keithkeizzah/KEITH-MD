const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    try {
        // Apply middleware to the context
        await middleware(context, async () => {
            const { client, m } = context;

            // Ensure that client.chats exists and is iterable (or can be fetched correctly)
            if (!client.chats || !client.chats.getAll) {
                console.error('client.chats is not available or does not have a "getAll" method');
                return m.reply('Could not retrieve chats. Please try again later.');
            }

            // Fetch all chats from the client (assuming getAll is a valid method to fetch all chats)
            let chats;
            try {
                chats = await client.chats.getAll(); // Using a method to fetch all chats
            } catch (err) {
                console.error('Failed to retrieve chats:', err);
                return m.reply('Could not retrieve chats. Please try again later.');
            }

            // If no chats are found, notify the user
            if (!chats || chats.length === 0) {
                return m.reply('No chats found to delete.');
            }

            // Loop through all chats and attempt to delete them
            for (const chat of chats) {
                try {
                    // Delete the chat using its jid
                    if (chat.jid) {
                        await client.modifyChat(chat.jid, 'delete');
                    }
                } catch (err) {
                    console.error(`Failed to delete chat with jid: ${chat.jid}`, err);
                }
            }

            // Send success message after all chats are processed
            return m.reply('All chats cleared successfully!');
        });
    } catch (err) {
        // General error handling for any issues in the middleware or the main function
        console.error('An error occurred while clearing the chats:', err);
        return m.reply('An error occurred while clearing the chats. Please try again later.');
    }
};
