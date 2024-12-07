const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, participants, text } = context;

        // Function to detect if the name is likely female (basic check)
        const isFemale = (name) => {
            const femaleKeywords = ['girl', 'lady', 'woman', 'female', 'miss', 'mrs'];
            return femaleKeywords.some(keyword => name.toLowerCase().includes(keyword));
        };

        // Filter out the female participants based on their names
        const femaleParticipants = participants.filter(mem => isFemale(mem.pushName)).map(mem => mem.id);

        if (femaleParticipants.length === 0) {
            return m.reply('_No female participants found in the group._');
        }

        let txt = `You have been tagged by ${m.pushName}.\n\nMessage: ${text || 'No Message!'}\n\n`;

        // Add the female participants' tags to the message
        for (let female of femaleParticipants) {
            txt += `📧 @${female.split('@')[0]}\n`;
        }

        // Send the message mentioning only the female participants
        await client.sendMessage(m.chat, { text: txt, mentions: femaleParticipants }, { quoted: m });
    });
};
