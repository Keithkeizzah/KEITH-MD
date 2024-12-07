const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;

        // Check if there is a quoted message, or use the current message
        let quotedMessage = m.quoted ? m.quoted : m;

        // Get the mimetype of the quoted message or the current message
        let mime = quotedMessage.mimetype || '';

        // If no mimetype or it's not an image, ask the user to quote an image
        if (!mime.startsWith('image/')) {
            return m.reply('Please quote an image to set as the group profile picture.');
        }

        try {
            // Download the image from the quoted message
            const imgBuffer = await quotedMessage.downloadMedia();

            // Ensure the image was successfully downloaded
            if (!imgBuffer) {
                return m.reply('Failed to download the image. Please try again.');
            }

            // Update the group profile picture with the downloaded image buffer
            await client.updateProfilePicture(m.chat, imgBuffer);

            // Notify the user that the group image was updated successfully
            return m.reply('_Group image updated successfully._');
        } catch (error) {
            console.error('Error updating group image:', error);
            return m.reply('_Failed to update the group image. Please try again later._');
        }
    });
};
