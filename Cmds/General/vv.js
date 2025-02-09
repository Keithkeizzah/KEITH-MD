module.exports = async (client, m) => {
  // Get the quoted message from the context
  const quotedMessage = m.msg?.contextInfo?.quotedMessage;

  // Check if there is a quoted message
  if (!quotedMessage) {
    return m.reply("Please quote a status media to save.");
  }

  try {
    // Handle image message
    if (quotedMessage.imageMessage) {
      let imageCaption = quotedMessage.imageMessage.caption || "No caption provided.";
      let imageUrl = await client.downloadMediaMessage(quotedMessage);
      await client.sendMessage(m.chat, { 
        image: { url: imageUrl }, 
        caption: `Retrieved by Keith\nOriginal caption: ${imageCaption}`
      }, { quoted: m });
    }

    // Handle video message
    if (quotedMessage.videoMessage) {
      let videoCaption = quotedMessage.videoMessage.caption || "No caption provided.";
      let videoUrl = await client.downloadMediaMessage(quotedMessage);
      await client.sendMessage(m.chat, { 
        video: { url: videoUrl }, 
        caption: `Retrieved by Keith\nOriginal caption: ${videoCaption}`
      }, { quoted: m });
    }

    // Handle audio message
    if (quotedMessage.audioMessage) {
      let audioUrl = await client.downloadMediaMessage(quotedMessage);
      await client.sendMessage(m.chat, { 
        audio: { url: audioUrl }, 
        mimetype: 'audio/mp4'
      }, { quoted: m });
    }

    // Handle sticker message
    if (quotedMessage.stickerMessage) {
      let stickerUrl = await client.downloadMediaMessage(quotedMessage);
      await client.sendMessage(m.chat, { 
        sticker: stickerUrl
      }, { quoted: m });
    }
  } catch (error) {
    console.error("Error processing the message:", error);
    m.reply('An error occurred while processing your request.');
  }
};
