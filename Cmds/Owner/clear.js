const middleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    try {
        // Call the middleware function
        await middleware(context, async () => {
            const { client, m } = context;

            // Check if clearChat method exists and is valid
            if (client.clearChat) {
                await client.clearChat();
                await m.reply('Chat cleared.');
            } else {
                await m.reply('Unable to clear chat. Method not found.');
            }
        });
    } catch (error) {
        console.error("Error in clearing chat:", error);
    }
};
