const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, text, isOwner } = context;

    try {
      if (!text) {
        return m.reply("❌ Please provide a name to update the profile.");
      }

      if (!isOwner) {
        return m.reply("❌ You do not have permission to perform this action.");
      }

      const name = text.trim();

      await client.updateProfileName(name);
      m.reply(`✅ Profile name updated to: ${name}`);
    } catch (error) {
      console.error("Error in updating profile name:", error);
      m.reply("❌ An error occurred while updating profile name. Please try again later.");
    }
  });
};
