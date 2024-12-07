const middleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, text } = context;

        // Determine the new profile name (from text or reply message)
        const newName = text || m.reply_message?.text;
        if (!newName) {
            return m.reply('_Please provide a new name._');
        }

        try {
            // Update the owner's profile name (not the group name)
            await client.updateProfileName(newName);
            return m.reply('_Profile name updated successfully._');
        } catch (error) {
            console.error('Error updating profile name:', error);
            return m.reply('_Failed to update the profile name. Please try again later._');
        }
    });
};
