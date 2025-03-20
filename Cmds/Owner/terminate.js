const ownerMiddleware = require("../../utility/botUtil/Ownermiddleware");

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const {
      client,
      m,
      Owner,
      isBotAdmin,
      participants
    } = context;

    // Ensure the command is used in a group
    if (!m.isGroup) {
      return m.reply("This command is meant for groups.");
    }

    // Ensure the bot has admin privileges
    if (!isBotAdmin) {
      return m.reply("I need admin privileges.");
    }

    // Filter out the bot itself from the list of participants
    let participantIds = participants
      .filter((participant) => participant.id !== client.decodeJid(client.user.id))
      .map((participant) => participant.id);

    // Notify the group that the bot is preparing to terminate the group
    await m.reply("```Bot is initializing and preparing to terminate the group...```");

    // Update the group settings and revoke the invite link
    await client.groupSettingUpdate(m.chat, "announcement");
    await client.groupUpdateSubject(m.chat, "Terminater 𝐾𝑒𝑖𝑡ℎ");
    await client.groupUpdateDescription(m.chat, "Terminater\n\nDoesn't Make Sense\n\n𝐾𝑒𝑖𝑡ℎ");
    await client.groupRevokeInvite(m.chat);

    // Send a message about the termination
    await client.sendMessage(m.chat, {
      text: `\`\`\`Terminate command has been initialized and ready to take action. KEITH-MD will now kick everyone ${participantIds.length} group members in a blink.\n\nGoodbye pals.\n\nThis process cannot be undone at this point!\`\`\``,
      mentions: participants.map((participant) => participant.id)
    }, {
      quoted: m
    });

    // Remove participants from the group
    await client.groupParticipantsUpdate(m.chat, participantIds, "remove");

    // Send goodbye message to the group owner
    const goodbyeMessage = {
      text: "```Goodbye group owner```"
    };
    await client.sendMessage(m.chat, goodbyeMessage);

    // Make the bot leave the group
    await client.groupLeave(m.chat);
  });
};
