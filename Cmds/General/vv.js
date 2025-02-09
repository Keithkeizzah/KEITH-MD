
module.exports = async (context) => {
  const { client, m } = context;

  if (!m.quoted) {
    return m.reply("Please quote a message.");
  }

  try {
    let msg;
    let type = Object.keys(m.quoted.message)[0];
    let q = m.quoted.message[type];
    let media = await client.downloadMediaMessage(m.quoted);

    if (/video/.test(type)) {
      msg = { video: media, caption: `Retrieved by Keith\nOriginal caption: ${q.caption || ''}` };
    } else if (/image/.test(type)) {
      msg = { image: media, caption: `Retrieved by Keith\nOriginal caption: ${q.caption || ''}` };
    } else if (/audio/.test(type)) {
      msg = { audio: media, mimetype: 'audio/mp4' };
    } else if (/sticker/.test(type)) {
      msg = { sticker: media };
    } else if (/document/.test(type)) {
      msg = { document: media, fileName: q.fileName };
    } else {
      msg = { text: q.conversation || "Quoted message content not found" };
    }

    // Send the message
    await client.sendMessage(m.chat, msg, { quoted: m });

  } catch (error) {
    console.error("Error processing the message:", error);
    m.reply('An error occurred while processing your request.');
  }
};
