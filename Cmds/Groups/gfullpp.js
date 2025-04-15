const middleware = require('../../utility/botUtil/middleware');
const { S_WHATSAPP_NET } = require('@whiskeysockets/baileys');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, text, isOwner, botNumber, generateProfilePicture, mime, msgKeith } = context;

        try {
            const fs = require("fs");

            // Check if the message is quoted and contains an image
            if (!msgKeith) {
                m.reply('Quote an image...');
                return;
            }

            let media;
            if (msgKeith.imageMessage) {
                media = msgKeith.imageMessage;
            } else {
                m.reply('This is not an image...');
                return;
            }

            // Download the media
            const medis = await client.downloadAndSaveMediaMessage(media);

            // Generate the profile picture (assuming `generateProfilePicture` is defined elsewhere)
            const { img } = await generateProfilePicture(medis);

            // Ensure the message is from a group
            if (!m.isGroup) {
                m.reply('This command can only be used in a group.');
                return;
            }

            // Get the group ID
            const groupId = m.chat;

            // Update the group profile picture
            await client.query({
                tag: 'iq',
                attrs: {
                    to: S_WHATSAPP_NET,
                    type: 'set',
                    xmlns: 'w:profile:picture',
                    target: groupId // Target the group
                },
                content: [
                    {
                        tag: 'picture',
                        attrs: { type: 'image' },
                        content: img
                    }
                ]
            });

            // Clean up the downloaded media
            fs.unlinkSync(medis);

            // Notify the user
            m.reply("Group profile picture updated successfully!");
        } catch (error) {
            console.error("Error updating group profile picture:", error);
            m.reply("An error occurred while updating the group profile picture:\n" + error);
        }
    });
};
