const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;

        // Check if the message has a reply with an image
        if (!m.reply_message?.image) {
            return m.reply('_Please reply with an image!_');
        }

        try {
            // Download and save the image
            const img = await m.reply_message.downloadAndSaveMedia();

            // Update the group profile picture with the downloaded image
            await client.updateProfilePicture(m.chat, img);

            // Notify the user that the group image was updated
            return m.reply('_Group image updated successfully._');
        } catch (error) {
            console.error('Error updating group image:', error);
            return m.reply('_Failed to update the group image. Please try again later._');
        }
    });
};
