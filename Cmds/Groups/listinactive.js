const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, text } = context;

        // Check if the number of inactive days is provided
        if (!text) {
            return m.reply('Please provide the number of inactive days (e.g., 5, 10, 20, etc.).');
        }

        // Parse the number of inactive days from the text
        const inactiveDays = parseInt(text);
        if (isNaN(inactiveDays) || inactiveDays < 5) {
            return m.reply('Please provide a valid number of inactive days (minimum 5 days).');
        }

        // Get group metadata and participants
        const groupMetadata = await client.groupMetadata(m.chat);
        const participants = groupMetadata.participants.map(p => p.id);

        // Get all messages in the group
        const msgs = await client.getMessages(m.chat);
        const senders = Object.keys(msgs);

        // Find inactive members
        const inactiveMembers = [];
        const currentDate = new Date().getTime();

        for (const user of participants) {
            try {
                const lastMessageTime = msgs[user]?.time || 0;
                const timeDiff = currentDate - lastMessageTime;
                const daysInactive = Math.floor(timeDiff / (1000 * 3600 * 24));

                if (daysInactive >= inactiveDays || !senders.includes(user)) {
                    inactiveMembers.push(user);
                }
            } catch (error) {
                console.error(`Error processing user ${user}:`, error);
            }
        }

        // If no inactive members found
        if (inactiveMembers.length === 0) {
            return m.reply(`No members found inactive for ${inactiveDays} days or more.`);
        }

        // List inactive members with mentions
        let resultMessage = `*Members inactive for ${inactiveDays} days or more:*\n\n`;
        inactiveMembers.forEach((user, index) => {
            resultMessage += `${index + 1}. 📧 @${user.split('@')[0]}\n`;
        });

        // Send the message with mentions
        await client.sendMessage(m.chat, {
            text: resultMessage,
            mentions: inactiveMembers
        }, { quoted: m });

        // Optional: Kick inactive members (uncomment to enable)
        /*
        const kickMessage = `Kicking ${inactiveMembers.length} members inactive for ${inactiveDays} days or more.`;
        await m.reply(kickMessage);

        for (const user of inactiveMembers) {
            try {
                await client.groupParticipantsUpdate(m.chat, [user], 'remove');
                await new Promise(resolve => setTimeout(resolve, 1000)); // Delay to avoid rate limits
            } catch (error) {
                console.error(`Failed to kick user ${user}:`, error);
            }
        }

        m.reply(`Successfully kicked ${inactiveMembers.length} inactive members. 🚫`);
        */
    });
};
