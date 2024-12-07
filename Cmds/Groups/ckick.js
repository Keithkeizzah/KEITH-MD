const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, text } = context;

        // Clean up and validate country code input
        const countryCode = text?.trim().replace('+', '');
        if (!countryCode || isNaN(countryCode)) {
            return m.reply('_Please provide a valid country code._');
        }

        // Retrieve group metadata and participants
        const metadata = await client.groupMetadata(m.chat);
        const participants = metadata.participants;

        // Filter participants based on country code and exclude admins
        const toKick = participants.filter(participant => 
            participant.id.startsWith(`${countryCode}`) && !participant.admin
        ).map(participant => participant.id);

        // Handle case where no matching participants are found
        if (toKick.length === 0) {
            return m.reply(`_No members found with the country code ${countryCode}._`);
        }

        // Kick the filtered participants
        for (const jid of toKick) {
            await client.groupParticipantsUpdate(m.chat, [jid], 'remove');
            await m.reply(`_Kicked member:_ @${jid.split('@')[0]}`, { mentions: [jid] });
            await delay(2000); // Adding a delay between actions
        }

        // Send confirmation message after kicking members
        await m.reply(`_Kicked all members with country code ${countryCode}._`);
    });
};

// Helper function for delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
