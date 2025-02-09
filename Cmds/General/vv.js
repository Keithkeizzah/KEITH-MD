
const { Sticker, StickerTypes } = require('@whiskeysockets/baileys');

module.exports = async (context) => {
  const { client, m } = context;

  if (!m.quoted) {
    return m.reply("Please quote a view-once message.");
  }

  try {
    let msg;
    const messageType = Object.keys(m.quoted.message)[0];

    if (['imageMessage', 'videoMessage'].includes(messageType)) {
      const media = await client.downloadAndSaveMediaMessage(m.quoted);
      msg = { video: { url: media }, caption: m.quoted.message[messageType].caption || '' };
    } else if (messageType === 'audioMessage') {
      const media = await client.downloadAndSaveMediaMessage(m.quoted);
      msg = { audio: { url: media }, mimetype: 'audio/mp4' };
    } else if (messageType === 'stickerMessage') {
      const media = await client.downloadAndSaveMediaMessage(m.quoted);
      const stickerMess = new Sticker(media, {
        pack: 'KEITH-MD',
        type: StickerTypes.CROPPED,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      });
      const stickerBuffer2 = await stickerMess.toBuffer();
      msg = { sticker: stickerBuffer2 };
    } else {
      msg = { text: m.quoted.conversation || "Quoted message content not found" };
    }

    // Send the message
    await client.sendMessage(m.chat, msg);

  } catch (error) {
    console.error("Error processing the message:", error);
    m.reply('An error occurred while processing your request.');
  }
};
 
