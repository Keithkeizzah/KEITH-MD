const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;

        let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''

if (!mime) return m.reply('Quote an image')
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
