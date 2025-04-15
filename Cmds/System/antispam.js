const { performance } = require('perf_hooks');
const ownerMiddleware = require("../../utility/botUtil/Ownermiddleware");

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, text } = context;

    // Skip messages if anti-spam is disabled or if message is invalid
    if (!chats[m.chat]?.antiSpam || m.isBaileys || m.mtype === 'protocolMessage' || m.mtype === 'pollUpdateMessage' || m.mtype === 'reactionMessage') {
      return;
    }

    // Ensure message is valid
    if (!m.msg || !m.message || m.key.remoteJid !== m.chat || users[m.sender]?.banned || chats[m.chat]?.isBanned) {
      return;
    }

    // Initialize spam tracking for the sender if not done already
    client.spam = client.spam || {};
    client.spam[m.sender] = client.spam[m.sender] || { count: 0, lastspam: 0 };

    const now = performance.now();
    const timeDifference = now - client.spam[m.sender].lastspam;

    // Check if the sender is spamming by sending messages too quickly
    if (timeDifference < 10000) {
      // Increment spam count
      client.spam[m.sender].count++;

      // If spam count reaches 5, ban the user and initiate cooldown
      if (client.spam[m.sender].count >= 5) {
        // Ban the user for 5 seconds and notify them
        users[m.sender].banned = true;
        client.spam[m.sender].lastspam = now + 5000;

        // Reset the ban and spam count after the cooldown period
        setTimeout(() => {
          users[m.sender].banned = false;
          client.spam[m.sender].count = 0;
          m.reply(`✅ Cooldown finished. You can send messages again.`);
        }, 5000);

        const messageType = m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) || 'Unknown';
        return m.reply(`❌ *Please do not spam ${messageType}*\nWait for ${Math.ceil((client.spam[m.sender].lastspam - now) / 1000)} seconds.`);
      }
    } else {
      // Reset the spam count if enough time has passed
      client.spam[m.sender].count = 0;
    }

    // Update the last spam timestamp for the sender
    client.spam[m.sender].lastspam = now;
  });
};
