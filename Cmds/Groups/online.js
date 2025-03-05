const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, isOwner, participants } = context;

    try {
      if (!isOwner) {
        return m.reply("❌ You do not have permission to perform this action.");
      }

      const groupMetadata = await client.groupMetadata(m.chat); // Fetch the group metadata
      const onlineMembers = [];

      // Request presence updates for each member and listen for their presence status
      for (const participant of groupMetadata.participants) {
        await client.presenceSubscribe(participant.id);
      }

      // Listen for presence updates
      client.ev.on('presence.update', async (json) => {
        for (const participant of groupMetadata.participants) {
          const presence = json.presences[participant.id]?.lastKnownPresence;
          if (presence === 'available') {  // Check if the member is online
            if (!onlineMembers.some(member => member.id === participant.id)) {
              onlineMembers.push(participant.id);
            }
          }
        }

        // Reply with the list of online members in the desired format
        const onlineMembersText = onlineMembers.map((member, index) => `${index + 1}. ${member}`).join('\n');
        m.reply(`Online members:\n${onlineMembersText}`);
      });

    } catch (error) {
      console.error("Error in listing online members:", error);
      m.reply("❌ An error occurred while listing online members. Please try again later.");
    }
  });
};
