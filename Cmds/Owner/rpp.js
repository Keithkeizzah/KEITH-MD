const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware'); 
const { S_WHATSAPP_NET } = require('@whiskeysockets/baileys');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, isOwner } = context;

    try {
      if (!isOwner) {
        return m.reply("❌ You do not have permission to perform this action.");
      }

      await client.query({
        tag: 'iq',
        attrs: {
          to: S_WHATSAPP_NET,
          type: 'set',
          xmlns: 'w:profile:picture'
        },
        content: [
          {
            tag: 'picture',
            attrs: { type: 'image' },
            content: null // Setting content to null to remove the profile picture
          }
        ]
      });

      m.reply("✅ Bot profile picture removed successfully.");
    } catch (error) {
      console.error("Error in removing bot profile picture:", error);
      m.reply("❌ An error occurred while removing the bot profile picture. Please try again later.");
    }
  });
};
