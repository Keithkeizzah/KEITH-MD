const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, isOwner, participants } = context;
    let lastTextTime = 0;
    const messageDelay = 5000; // Set the delay time

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
        const currentTime = Date.now();
        if (currentTime - lastTextTime >= messageDelay) { // Check if enough time has passed since the last message
          for (const participant of groupMetadata.participants) {
            const presence = json.presences[participant.id]?.lastKnownPresence;
            if (presence === 'composing') {  // Check if the member is typing
              if (!typingMembers.some(member => member.id === participant.id)) {
                const contact = await client.getContact(participant.id);
                typingMembers.push({ id: participant.id, pushname: contact.pushname || contact.notify });
              }
            }
          }

          // Reply with the list of typing members in a smart format
          const typingMembersText = typingMembers.map((member, index) => `${index + 1}. @${member.pushname}`).join('\n');
          m.reply(`There are ${typingMembers.length} members currently typing in this group:\n${typingMembersText} ${m.pushName}`, {
            mentions: typingMembers.map(member => member.id)
          });

          lastTextTime = currentTime; // Update the last text time
        }
      });

      m.reply("⏳ Fetching typing members. Please wait...");

    } catch (error) {
      console.error("Error in listing typing members:", error);
      m.reply("❌ An error occurred while listing typing members. Please try again later.");
    }
  });
};
