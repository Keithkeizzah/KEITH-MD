const middleware = require('../../utility/botUtil/middleware');
const { S_WHATSAPP_NET } = require('@whiskeysockets/baileys');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;

        try {
            // Ensure the command is used in a group
            if (!m.isGroup) {
                m.reply('This command can only be used in a group.');
                return;
            }

            // Get the group ID
            const groupId = m.chat;

            // Fetch the group's metadata
            const groupMetadata = await client.groupMetadata(groupId);

            // Get the group's profile picture URL
            let groupPpUrl;
            try {
                groupPpUrl = await client.profilePictureUrl(groupId, 'image');
            } catch {
                groupPpUrl = "https://telegra.ph/file/95680cd03e012bb08b9e6.jpg"; // Default image if group picture is not accessible
            }

            // Set the group description
            const groupDescription = "Just work and give me your best.";

            // Update the group description
            await client.groupUpdateDescription(groupId, groupDescription);

            // Prepare the message with group profile details
            const mess = {
                image: { url: groupPpUrl },
                caption: `*Group Name:* ${groupMetadata.subject}\n` +
                         `*Group Description:* ${groupDescription}\n` +
                         `*Group Members:* ${groupMetadata.participants.length}\n` +
                         `*Group Created:* ${new Date(groupMetadata.creation * 1000).toLocaleString()}`
            };

            // Send the group profile information
            await client.sendMessage(m.chat, mess, { quoted: m });

            // Notify the user
            m.reply("Group profile updated successfully!");
        } catch (error) {
            console.error("Error updating group profile:", error);
            m.reply("An error occurred while updating the group profile:\n" + error);
        }
    });
};
