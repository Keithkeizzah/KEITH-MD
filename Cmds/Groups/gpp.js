const middleware = require('../../utility/botUtil/middleware');
const { S_WHATSAPP_NET } = require('@whiskeysockets/baileys');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, sendReply, sendMediaMessage, botname, author } = context;

        try {
            const isGroup = m.chat.endsWith('@g.us');
            let profileInfo;

            if (isGroup) {
                // Handle group profile
                const groupMetadata = await client.groupMetadata(m.chat);
                const participants = groupMetadata.participants || [];
                
                let ppUrl;
                try {
                    ppUrl = await client.profilePictureUrl(m.chat, 'image');
                } catch {
                    ppUrl = "https://telegra.ph/file/95680cd03e012bb08b9e6.jpg";
                }

                profileInfo = {
                    image: { url: ppUrl },
                    caption: `👥 *Group Information*\n\n` +
                             `🔖 *Name:* ${groupMetadata.subject}\n` +
                             `📝 *Description:* ${groupMetadata.desc || 'No description'}\n` +
                             `📅 *Created:* ${new Date(groupMetadata.creation * 1000).toLocaleDateString()}\n` +
                             `👤 *Members:* ${participants.length}\n` +
                             `👑 *Admins:* ${participants.filter(p => p.admin).length}\n` +
                             `🔒 *Restricted:* ${groupMetadata.restrict ? 'Yes' : 'No'}\n` +
                             `🆔 *ID:* ${groupMetadata.id}\n\n` +
                             `_Powered by ${author}_`
                };
            } else {
                // Handle user profile
                const sender = m.quoted ? m.quoted.sender : m.sender;
                const contact = await client.getContact(sender, 'full');
                const name = contact.notify || contact.name || sender.split('@')[0];

                let ppUrl;
                try {
                    ppUrl = await client.profilePictureUrl(sender, 'image');
                } catch {
                    ppUrl = "https://telegra.ph/file/95680cd03e012bb08b9e6.jpg";
                }

                let status;
                try {
                    status = await client.fetchStatus(sender);
                } catch {
                    status = { status: "🔒 Private (status not available)" };
                }

                profileInfo = {
                    image: { url: ppUrl },
                    caption: `👤 *User Profile*\n\n` +
                             `🔖 *Name:* ${name}\n` +
                             `📝 *About:* ${status.status}\n` +
                             `📱 *Number:* ${sender.split('@')[0]}\n` +
                             `🆔 *ID:* ${sender}\n\n` +
                             `_Powered by ${author}_`,
                    mentions: [sender]
                };
            }

            await sendMediaMessage(client, m, profileInfo);

        } catch (error) {
            console.error('Profile Check Error:', error);
            await sendReply(client, m, '❌ Failed to fetch profile information. Please try again.');
        }
    });
};
