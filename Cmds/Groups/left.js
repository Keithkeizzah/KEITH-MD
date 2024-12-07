const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;
        
        // Ensure the message contains the necessary data and user is present
        const user = m.sender;

        // Send a message notifying the user left the group
        await client.sendMessage(m.chat, '_User Left Group_');

        // Remove the user from the group
        await client.groupParticipantsUpdate(m.chat, [user], 'remove');
    });
};
