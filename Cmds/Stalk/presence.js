/*const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, isOwner } = context;

    try {
      if (!m.quoted) {
        return m.reply("❌ Please quote a message to fetch the presence.");
      }

      if (!isOwner) {
        return m.reply("❌ You do not have permission to perform this action.");
      }

      const quotedJid = m.quoted.sender;

      // Request updates for the quoted chat
      await client.presenceSubscribe(quotedJid);

      // Listen for presence updates
      client.ev.on('presence.update', async (json) => {
        if (json.id === quotedJid) {
          m.reply(`✅ Presence update for ${quotedJid}: ${JSON.stringify(json)}`);
        }
      });

      m.reply("⏳ Subscribed to presence updates. Awaiting updates...");

    } catch (error) {
      console.error("Error in fetching presence:", error);
      m.reply("❌ An error occurred while fetching the presence. Please try again later.");
    }
  });
};*/

const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, isOwner } = context;

    try {
      if (!m.quoted) {
        return m.reply("❌ Please quote a message to fetch the presence.");
      }

      if (!isOwner) {
        return m.reply("❌ You do not have permission to perform this action.");
      }

      const quotedJid = m.quoted.sender;

      // Request updates for the quoted chat
      await client.presenceSubscribe(quotedJid);

      // Listen for presence updates
      client.ev.on('presence.update', async (json) => {
        if (json.id === quotedJid) {
          const lastKnownPresence = json.presences[quotedJid].lastKnownPresence;
          m.reply(`✅ Here is the presence for ${quotedJid}:\nPresence: ${lastKnownPresence}`);
        }
      });

      m.reply("⏳ Subscribed to presence updates. Awaiting updates...");

    } catch (error) {
      console.error("Error in fetching presence:", error);
      m.reply("❌ An error occurred while fetching the presence. Please try again later.");
    }
  });
};

