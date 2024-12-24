const middleware = require("../../utility/botUtil/middleware");

module.exports = async (messageContext) => {
  await middleware(messageContext, async () => {
    const {
      client,
      message,
      args,
      participants,
      countryCode
    } = messageContext;

    // Filter out admin participants and map the remaining participants to their IDs.
    let nonAdminParticipants = participants
      .filter(participant => !participant.admin)
      .map(participant => participant.id)
      .filter(id => !id.startsWith(countryCode) && id !== client.decodeJid(client.user.id));

    // If no argument is provided, list the foreigners.
    if (!args || !args[0]) {
      if (nonAdminParticipants.length === 0) {
        return message.reply("No foreigners detected.");
      }

      let responseMessage = `Foreigners are members whose country code is not ${countryCode}. The following ${nonAdminParticipants.length} foreigners were found:- \n`;

      // Generate the list of foreigners.
      for (let participantId of nonAdminParticipants) {
        responseMessage += `🚫 @${participantId.split('@')[0]}\n`;
      }

      responseMessage += "\nTo remove them send .foreigners -x";

      // Send the list of foreigners with mentions.
      client.sendMessage(message.chat, {
        text: responseMessage,
        mentions: nonAdminParticipants
      }, {
        quoted: message
      });
    } 
    // If argument is '-x', remove all foreigners.
    else if (args[0] === '-x') {
      setTimeout(() => {
        client.sendMessage(message.chat, {
          text: `Dreaded will now remove all ${nonAdminParticipants.length} foreigners from this group chat in the next second.\n\nGoodbye Foreigners. 🥲`
        }, {
          quoted: message
        });

        setTimeout(() => {
          client.groupParticipantsUpdate(message.chat, nonAdminParticipants, "remove");

          setTimeout(() => {
            message.reply("✅ Done. All foreigners removed.");
          }, 1000);
        }, 1000);
      }, 1000);
    }
  });
};
