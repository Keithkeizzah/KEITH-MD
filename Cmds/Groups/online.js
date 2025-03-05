const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, isOwner } = context;

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
          if (presence === 'available' || presence === 'composing' || presence === 'recording') {
            if (!onlineMembers.some(member => member.id === participant.id)) {
              const contact = await client.getContact(participant.id);
              onlineMembers.push({ id: participant.id, pushname: contact.pushname || contact.notify });
            }
          }
        }

        // Reply with the list of online members in a smart format
        const onlineMembersText = onlineMembers.map((member, index) => `${index + 1}. @${member.pushname}`).join('\n');
        m.reply(`There are ${onlineMembers.length} online members in this group:\n${onlineMembersText}`, {
          mentions: onlineMembers.map(member => member.id)
        });
      });

      m.reply("⏳ Fetching online members. Please wait...");

    } catch (error) {
      console.error("Error in listing online members:", error);
      m.reply("❌ An error occurred while listing online members. Please try again later.");
    }
  });
};


/*const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, isOwner } = context;

    try {
      if (!isOwner) {
        return m.reply("❌ You do not have permission to perform this action.");
      }

      const groupMembers = await client.groupMetadata(m.chat); // Fetch the group metadata
      const onlineMembers = [];

      // Request presence updates for each member and listen for their presence status
      for (const participant of groupMembers.participants) {
        await client.presenceSubscribe(participant.id);
      }

      // Listen for presence updates
      client.ev.on('presence.update', async (json) => {
        for (const participant of groupMembers.participants) {
          if (json.presences[participant.id]?.lastKnownPresence === 'available' || json.presences[participant.id]?.lastKnownPresence === 'composing' || json.presences[participant.id]?.lastKnownPresence === 'recording') {
            if (!onlineMembers.includes(participant.id)) {
              onlineMembers.push(participant.id);
            }
          }
        }

        // Reply with the list of online members
        const onlineMembersText = onlineMembers.map(member => member.split('@')[0]).join(', ');
        m.reply(`✅ Online members in the group:\n${onlineMembersText}`);
      });

      m.reply("⏳ Fetching online members. Please wait...");

    } catch (error) {
      console.error("Error in listing online members:", error);
      m.reply("❌ An error occurred while listing online members. Please try again later.");
    }
  });
};*/
