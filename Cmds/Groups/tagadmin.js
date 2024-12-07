const middleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;

        try {
            // Fetch the group metadata
            const groupMetadata = await client.groupMetadata(m.jid);
            const groupAdmins = groupMetadata.participants.filter(p => p.admin).map(p => p.id);

            // Check if there are admins
            if (groupAdmins.length > 0) {
                // Create tags for each admin
                const adminTags = groupAdmins.map(admin => `@${admin.split('@')[0]}`);
                const replyText = `*_Group Admins:_*\n${adminTags.join('\n')}`;

                // Reply with the list of admins, with mentions
                await m.reply(replyText, { mentions: groupAdmins });
            } else {
                await m.reply('_No admins found._');
            }
        } catch (error) {
            console.error('Error fetching group metadata or admins:', error);
            await m.reply('_An error occurred while fetching group admins. Please try again later._');
        }
    });
};
