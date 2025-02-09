
const { Sticker, StickerTypes } = require('@whiskeysockets/baileys');

module.exports = async (context) => {
  const { client, m } = context;

  if (!m.quoted) {
    return m.reply("Please quote a view-once message.");
  }

  try {
    let msg;
    const messageType = Object.keys(m.quoted.message)[0];
    const quotedMessage = m.quoted.message[messageType];
    const media = await client.downloadMediaMessage(m.quoted);

    if (/video/.test(messageType)) {
      msg = { video: media, caption: `Retrieved by Keith\nOriginal caption: ${quotedMessage.caption || ''}` };
    } else if (/image/.test(messageType)) {
      msg = { image: media, caption: `Retrieved by Keith\nOriginal caption: ${quotedMessage.caption || ''}` };
    } else if (/audio/.test(messageType)) {
      msg = { audio: media, mimetype: 'audio/mp4' };
    } else if (/sticker/.test(messageType)) {
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
    await client.sendMessage(m.chat, msg, { quoted: m });

  } catch (error) {
    console.error("Error processing the message:", error);
    m.reply('An error occurred while processing your request.');
  }
}; 
