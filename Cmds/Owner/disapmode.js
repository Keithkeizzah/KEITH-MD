const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, text, isOwner } = context;

    try {
      if (!text) {
        return m.reply("❌ Please provide a valid duration value. Options are: 86400 (1 day), 604800 (1 week), 7776000 (90 days), 0 (off).");
      }

      if (!isOwner) {
        return m.reply("❌ You do not have permission to perform this action.");
      }

      const duration = parseInt(text.trim()); // Options: 86400, 604800, 7776000, 0
      
      await client.updateDefaultDisappearingMode(duration);
      m.reply(`✅ Default disappearing mode updated to: ${duration} seconds`);
    } catch (error) {
      console.error("Error in updating default disappearing mode:", error);
      m.reply("❌ An error occurred while updating default disappearing mode. Please try again later.");
    }
  });
};
