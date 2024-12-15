module.exports = async (client, m, Owner, budy, fetchJson, store) => {
  const { proto } = require("@whiskeysockets/baileys");

  if (budy && budy.startsWith('>')) {
    // Check if the sender is either the Owner or Keithkeizzah
    if (![Owner, "Keithkeizzah"].includes(m.sender)) {
      return m.reply("Only my owner or Keithkeizzah can execute this command 🚫", null, {
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            title: "Eval Command Restricted",
            thumbnailUrl: "https://i.imgur.com/XlQIFIF.jpeg",
            mediaType: 1,
            sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
            renderLargerThumbnail: true,
          },
        },
      });
    }

    try {
      let evaled = await eval(budy.slice(2)); 
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled); 
      await m.reply(evaled); 
    } catch (err) { 
      await m.reply(String(err)); 
    } 
  }
};
