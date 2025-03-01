const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, text, sendReply, sendMediaMessage } = context;

        try {
            const isGroup = m.chat.endsWith('@g.us');
            
            if (isGroup) {
                const groupMetadata = await client.groupMetadata(m.chat);
                const participants = groupMetadata.participants || [];

                if (text?.toLowerCase() === 'online') {
                    // List all group members
                    let memberList = '📱 *Online Group Members*\n\n';
                    
                    participants.forEach((member, index) => {
                        memberList += `${index + 1}. 👤 @${member.id.split('@')[0]}\n`;
                    });

                    await sendMediaMessage(client, m, {
                        image: { 
                            url: "https://telegra.ph/file/95680cd03e012bb08b9e6.jpg" 
                        },
                        caption: `${memberList}\n🏆 *Total Members:* ${participants.length}\n\n_Powered by ${client.user.name}_`,
                        mentions: participants.map(p => p.id)
                    });
                } else {
                    // Original group info functionality
                    let ppUrl;
                    try {
                        ppUrl = await client.profilePictureUrl(m.chat, 'image');
                    } catch {
                        ppUrl = "https://telegra.ph/file/95680cd03e012bb08b9e6.jpg";
                    }

                    const groupInfo = `👥 *Group Information*\n\n` +
                                      `🔖 *Name:* ${groupMetadata.subject}\n` +
                                      `📝 *Description:* ${groupMetadata.desc || 'No description'}\n` +
                                      `📅 *Created:* ${new Date(groupMetadata.creation * 1000).toLocaleDateString()}\n` +
                                      `👤 *Members:* ${participants.length}\n` +
                                      `👑 *Admins:* ${participants.filter(p => p.admin).length}\n` +
                                      `🔒 *Restricted:* ${groupMetadata.restrict ? 'Yes' : 'No'}\n\n` +
                                      `_Use *${process.env.PREFIX}online* to list all members_\n` +
                                      `_Powered by ${client.user.name}_`;

                    await sendMediaMessage(client, m, {
                        image: { url: ppUrl },
                        caption: groupInfo
                    });
                }
            } else {
                // Existing user profile functionality
                // ... (keep previous user profile code here)
            }

        } catch (error) {
            console.error('Group Info Error:', error);
            await sendReply(client, m, '❌ Failed to fetch group information. Please try again.');
        }
    });
};
