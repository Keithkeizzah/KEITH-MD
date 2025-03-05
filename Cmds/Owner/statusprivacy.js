const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, text, isOwner } = context;

    try {
      if (!text) {
        return m.reply("❌ Please provide a valid privacy value. Options are: 'all', 'contacts', 'contact_blacklist', 'none'.");
      }

      if (!isOwner) {
        return m.reply("❌ You do not have permission to perform this action.");
      }

      const value = text.trim(); // Options: 'all', 'contacts', 'contact_blacklist', 'none'
      
      await client.updateStatusPrivacy(value);
      m.reply(`✅ Status privacy updated to: ${value}`);
    } catch (error) {
      console.error("Error in updating status privacy:", error);
      m.reply("❌ An error occurred while updating status privacy. Please try again later.");
    }
  });
};
