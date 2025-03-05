const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, isOwner, participants } = context;

    try {
      if (!isOwner) {
        return m.reply("❌ You do not have permission to perform this action.");
      }

      const groupMetadata = await client.groupMetadata(m.chat); // Fetch the group metadata
      const typingMembers = [];

      // Request presence updates for each member and listen for their presence status
      for (const participant of groupMetadata.participants) {
        await client.presenceSubscribe(participant.id);
      }

      // Listen for presence updates
      client.ev.on('presence.update', async (json) => {
        for (const participant of groupMetadata.participants) {
          const presence = json.presences[participant.id]?.lastKnownPresence;
          if (presence === 'composing') {  // Check if the member is typing
            if (!typingMembers.some(member => member.id === participant.id)) {
              const contact = await client.getContact(participant.id);
              typingMembers.push({ id: participant.id, pushname: contact.pushname || contact.notify });
            }
          }
        }

        if (typingMembers.length > 0) {
          // Reply with the list of typing members in a single message
          const typingMembersText = typingMembers.map((member, index) => `${index + 1}. @${member.pushname}`).join('\n');
          m.reply(`${m.pushName}, there are ${typingMembers.length} members currently typing in this group:\n${typingMembersText}`, {
            mentions: typingMembers.map(member => member.id)
          });
        }
      });

    } catch (error) {
      console.error("Error in listing typing members:", error);
      m.reply("❌ An error occurred while listing typing members. Please try again later.");
    }
  });
};
