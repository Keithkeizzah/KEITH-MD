
module.exports = async (client, m) => {
  const textL = m.text.toLowerCase();
  const quotedMessage = m.msg?.contextInfo?.quotedMessage;

  if (!quotedMessage || !textL || !m.quoted.chat) {
    return m.reply("Please quote a status media to save.");
  }

  try {
    if (quotedMessage.imageMessage) {
      let imageCaption = quotedMessage.imageMessage.caption || "No caption provided.";
      let imageUrl = await client.downloadMediaMessage(m.quoted);
      await client.sendMessage(m.chat, { image: { url: imageUrl }, caption: `Retrieved by Keith\nOriginal caption: ${imageCaption}` }, { quoted: m });
    }

    if (quotedMessage.videoMessage) {
      let videoCaption = quotedMessage.videoMessage.caption || "No caption provided.";
      let videoUrl = await client.downloadMediaMessage(m.quoted);
      await client.sendMessage(m.chat, { video: { url: videoUrl }, caption: `Retrieved by Keith\nOriginal caption: ${videoCaption}` }, { quoted: m });
    }

    if (quotedMessage.audioMessage) {
      let audioUrl = await client.downloadMediaMessage(m.quoted);
      await client.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mp4' }, { quoted: m });
    }

    if (quotedMessage.stickerMessage) {
      let stickerUrl = await client.downloadMediaMessage(m.quoted);
      await client.sendMessage(m.chat, { sticker: stickerUrl }, { quoted: m });
    }
    
  } catch (error) {
    console.error("Error processing the message:", error);
    m.reply('An error occurred while processing your request.');
  }
};
