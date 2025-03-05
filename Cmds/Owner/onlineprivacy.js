const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, text, isOwner } = context;

    try {
      if (!text) {
        return m.reply("❌ Please provide a valid privacy value. Options are: 'all', 'match_last_seen'.");
      }

      if (!isOwner) {
        return m.reply("❌ You do not have permission to perform this action.");
      }

      const value = text.trim(); // Options: 'all', 'match_last_seen'
      
      await client.updateOnlinePrivacy(value);
      m.reply(`✅ Online privacy updated to: ${value}`);
    } catch (error) {
      console.error("Error in updating online privacy:", error);
      m.reply("❌ An error occurred while updating online privacy. Please try again later.");
    }
  });
};
