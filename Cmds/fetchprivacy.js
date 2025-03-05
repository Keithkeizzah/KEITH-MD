const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, isOwner } = context;

    try {
      if (!isOwner) {
        return m.reply("❌ You do not have permission to perform this action.");
      }

      const privacySettings = await client.fetchPrivacySettings(true);
      m.reply(`✅ Privacy settings:\n${JSON.stringify(privacySettings, null, 2)}`);
    } catch (error) {
      console.error("Error in fetching privacy settings:", error);
      m.reply("❌ An error occurred while fetching privacy settings. Please try again later.");
    }
  });
};
