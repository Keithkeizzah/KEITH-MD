const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;

        
        let quotedMessage = m.quoted ? m.quoted : m;

      
        let mime = quotedMessage.mimetype || '';

        
        if (!mime.startsWith('image/')) {
            return m.reply('Please quote an image to set as the group profile picture.');
        }

        try {
            
            const imgBuffer = await quotedMessage.downloadMedia();

            
            if (!imgBuffer) {
                return m.reply('Failed to download the image. Please try again.');
            }

            
            await client.updateProfilePicture(m.chat, imgBuffer);

            
            return m.reply('_Group image updated successfully._');
        } catch (error) {
            console.error('Error updating group image:', error);
            return m.reply('_Failed to update the group image. Please try again later._' + error);
        }
    });
};
