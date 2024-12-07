const middleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, text } = context;

        // Determine the new group name (from text or reply message)
        const subject = text || m.reply_message?.text;
        if (!subject) {
            return m.reply('_Please provide a new name._');
        }

        try {
            // Update the group subject (name)
            await client.updateSubject(m.chat, subject); // Ensure this method matches your bot framework
            return m.reply('_Name updated successfully._');
        } catch (error) {
            console.error('Error updating name:', error);
            return m.reply('_Failed to update the name. Please try again later._');
        }
    });
};
