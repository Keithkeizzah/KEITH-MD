const { addUserWithWarnCount, getWarnCountByJID, resetWarnCountByJID } = require(__dirname + "/../../lib/warn");
const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
  await middleware(context, async () => {
    const { client, m, text, args } = context;

    // Check if the message is quoted or mentioned
    if (!m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0)) {
      m.reply('Reply to a user with ".warn" or ".warn reset" to warn or reset the warn count.');
      return;
    }

    const authorReplied = m.quoted ? m.quoted.participant : m.mentionedJid[0];
    const warnLimit = 3;

    if (!args.length || args.join('') === '') {
      await addUserWithWarnCount(authorReplied);
      let warn = await getWarnCountByJID(authorReplied);

      if (warn >= warnLimit) {
        await client.sendMessage(m.chat, { text: 'This user has reached the limit of warnings, so they will be kicked out.' }, { quoted: m });
        await client.groupParticipantsUpdate(m.chat, [authorReplied], "remove");
      } else {
        const remaining = warnLimit - warn;
        await client.sendMessage(m.chat, { text: `This user has been warned. Warnings left before kick: ${remaining}` }, { quoted: m });
      }
    } else if (args[0] === 'reset') {
      await resetWarnCountByJID(authorReplied);
      m.reply("Warn count has been reset for this user.");
    } else {
      m.reply('Reply to a user with ".warn" or ".warn reset" to warn or reset the warn count.');
    }
  });
};
