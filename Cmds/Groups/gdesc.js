const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, text } = context;

        // Determine the new group name (from text or reply message)
        const description = text || m.reply_message?.text;
        if (!description) {
            return m.reply('_Please provide a description for group._');
        }

        try {
            client.groupUpdateDescription(m.chat, subject);
            return m.reply('_Group description updated successfully._');
        } catch (error) {
            console.error('Error updating group description:', error);
            return m.reply('_Failed to update the group description. Please try again later._');
        }
    });
};
