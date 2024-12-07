const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware'); 

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m } = context;

        // Get the list of blocked users
        const blockedUsers = await client.getBlockedIds();  // Ensure this method is available and returns an array of blocked JIDs

        // Check if there are no blocked users
        if (blockedUsers.length === 0) {
            return m.reply("There are no blocked users.");
        }

        // Format the response by tagging blocked users
        const tags = blockedUsers.map(user => `@${user.split('@')[0]}`).join(' '); // Create the tags without @s.whatsapp.net
        m.reply(`Here are all the blocked users: ${tags}`, {
            mentions: blockedUsers // This should be an array of JIDs for proper mentions
        });
    });
};
