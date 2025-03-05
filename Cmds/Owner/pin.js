const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware'); 

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, isOwner } = context;

    try {
      if (!m.quoted) {
        return m.reply("❌ Please quote a message to pin.");
      }

      if (!isOwner) {
        return m.reply("❌ You do not have permission to perform this action.");
      }

      const chatId = m.chat;
      const quotedMessageId = m.quoted.id;

      await client.chatModify(
        {
          pin: true, // Change to `false` to unpin
        },
        chatId,
        quotedMessageId
      );

      m.reply("✅ Message pinned successfully.");
    } catch (error) {
      console.error("Error in pinning message:", error);
      m.reply("❌ An error occurred while pinning the message. Please try again later.");
    }
  });
};
