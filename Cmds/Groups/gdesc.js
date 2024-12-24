const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, text } = context;

        // Determine the new group description (from text or reply message)
        const description = text || m.reply_message?.text;
        if (!description) {
            return m.reply('_Please provide a description for the group._');
        }

        try {
            // Update the group description using the correct variable
            await client.groupUpdateDescription(m.chat, description);
            return m.reply('_Group description updated successfully._');
        } catch (error) {
            console.error('Error updating group description:', error);
            return m.reply('_Failed to update the group description. Please try again later._');
        }
    });
};
