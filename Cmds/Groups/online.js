const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, text, sendMediaMessage } = context;

        try {
            const isGroup = m.chat.endsWith('@g.us');
            
            if (isGroup && text?.toLowerCase() === 'online') {
                const groupMetadata = await client.groupMetadata(m.chat);
                const participants = groupMetadata.participants || [];

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
            }
        } catch (error) {
            console.error('Group Info Error:', error);
            await context.sendReply(client, m, '❌ Failed to fetch group information. Please try again.');
        }
    });
};
