module.exports = async (context) => {
  const { client, m } = context;

  const quotedMessage = m.msg?.contextInfo?.quotedMessage;

  // Ensure the quoted message exists
  if (!quotedMessage) {
    return m.reply("You did not quote any media to post.");
  }

  // Handling image messages
  if (quotedMessage.imageMessage) {
    let imageCaption = quotedMessage.imageMessage.caption || '';
    let imageUrl = await client.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
    // Send the image to the user's status
    await client.sendMessage("status@broadcast", { image: { url: imageUrl }, caption: imageCaption });
    return m.reply("Image has been posted to your status.");
  }

  // Handling video messages
  if (quotedMessage.videoMessage) {
    let videoCaption = quotedMessage.videoMessage.caption || '';
    let videoUrl = await client.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
    // Send the video to the user's status
    await client.sendMessage("status@broadcast", { video: { url: videoUrl }, caption: videoCaption });
    return m.reply("Video has been posted to your status.");
  }

  // If the quoted message is not a media type we support
  return m.reply("Quoted message is not a supported media type.");
};
