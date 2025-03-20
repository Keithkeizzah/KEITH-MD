const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, text, sendReply, sendMediaMessage } = context;

        // Determine the new group name (from text or reply message)
        const subject = text || m.reply_message?.text;
        if (!subject) {
            return sendReply(client, m, '_Please provide a new name for the group._');
        }

        try {
            // Update the group subject (name)
            await client.groupUpdateSubject(m.chat, subject);
            return sendReply(client, m, '_Group name updated successfully._');
        } catch (error) {
            console.error('Error updating group name:', error);
            return sendReply(client, m, '_Failed to update the group name. Please try again later._');
        }
    });
};
