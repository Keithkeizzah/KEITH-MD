module.exports = async (context) => {
  const { client, m } = context;

  const quotedMessage = m.msg?.contextInfo?.quotedMessage;

  // Check if there is a quoted message
  if (!quotedMessage) {
    return m.reply("Please quote a status media to save.");
  }

  try {
    // Function to handle downloading and sending media
    const sendMedia = async (mediaType, mediaUrl, caption = '') => {
      const mediaObject = {
        [mediaType]: { url: mediaUrl },
        caption: caption ? `Retrieved by Keith\nOriginal caption: ${caption}` : undefined
      };
      await client.sendMessage(m.chat, mediaObject, { quoted: m });
    };

    // Handle image message
    if (quotedMessage.imageMessage) {
      const imageCaption = quotedMessage.imageMessage.caption || "No caption provided.";
      const imageUrl = await client.downloadMediaMessage(quotedMessage);
      await sendMedia('image', imageUrl, imageCaption);
    }

    // Handle video message
    if (quotedMessage.videoMessage) {
      const videoCaption = quotedMessage.videoMessage.caption || "No caption provided.";
      const videoUrl = await client.downloadMediaMessage(quotedMessage);
      await sendMedia('video', videoUrl, videoCaption);
    }

    // Handle audio message
    if (quotedMessage.audioMessage) {
      const audioUrl = await client.downloadMediaMessage(quotedMessage);
      await client.sendMessage(m.chat, {
        audio: { url: audioUrl },
        mimetype: 'audio/mp4'
      }, { quoted: m });
    }

    // Handle sticker message
    if (quotedMessage.stickerMessage) {
      const stickerUrl = await client.downloadMediaMessage(quotedMessage);
      await client.sendMessage(m.chat, { sticker: stickerUrl }, { quoted: m });
    }
  } catch (error) {
    console.error("Error processing the message:", error);
    m.reply('An error occurred while processing your request.');
  }
};
