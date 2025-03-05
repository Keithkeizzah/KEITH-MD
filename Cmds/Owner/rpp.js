const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, isOwner } = context;

    try {
      if (!m.quoted) {
        return m.reply("❌ Please quote a message to remove the profile picture.");
      }

      if (!isOwner) {
        return m.reply("❌ You do not have permission to perform this action.");
      }

      const jid = m.quoted.sender;

      await client.removeProfilePicture(jid);

      m.reply("✅ Profile picture removed successfully.");
    } catch (error) {
      console.error("Error in removing profile picture:", error);
      m.reply("❌ An error occurred while removing the profile picture. Please try again later.");
    }
  });
};
