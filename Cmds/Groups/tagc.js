const middleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, args, participants, text } = context;

        // Extract the country code from the message if given (assuming the format: !tag <countryCode>)
        const countryCode = args[0] ? args[0] : null;

        let txt = `You have been tagged by ${m.pushName}.\n\nMessage: ${text ? text : 'No Message!'}\n\n`;

        // Filter participants based on country code if provided
        let filteredParticipants = participants;

        if (countryCode) {
            filteredParticipants = participants.filter(member => {
                const memberPhoneNumber = member.id.split('@')[0]; // Extract the phone number part (without @c.us)
                return memberPhoneNumber.startsWith(countryCode);
            });

            if (filteredParticipants.length === 0) {
                return m.reply(`_No members found with the country code ${countryCode}_`);
            }
        }

        // Construct the text for tagging the filtered members
        for (let mem of filteredParticipants) {
            txt += `📧 @${mem.id.split('@')[0]}\n`;
        }

        // Send the message with mentions
        client.sendMessage(m.chat, { text: txt, mentions: filteredParticipants.map(a => a.id) }, { quoted: m });
    });
};
