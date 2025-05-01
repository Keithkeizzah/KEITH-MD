const axios = require('axios');

module.exports = async (context) => {
  const { client, m, text } = context;

  if (!text) {
    return m.reply("Please provide a SinhalaSub movie link.");
  }

  if (!text.includes('https://sinhalasub.lk/movies/')) {
    return m.reply("Invalid SinhalaSub movie link.");
  }

  try {
    // Fetch movie data from the API
    const apiUrl = `https://apis-keith.vercel.app/movie/sinhalasub/movie?url=${text}`;
    const response = await axios.get(apiUrl);
    const movieData = response.data.result.data;

    const caption = `
*𝐊𝐄𝐈𝐓𝐇 𝐌𝐃 𝐌𝐎𝐕𝐈𝐄 𝐃𝐋*
|__________________________|
|-᳆ *ᴛɪᴛʟᴇ*: ${movieData.title}
|__________________________
Reply with the numbers below:
- ᳆ 1 for SD 480p
- ᳆ 2 for HD 720p
- ᳆ 3 for FHD 1080p
|__________________________|
    `;

    // Send the image and caption
    const message = await client.sendMessage(m.chat, {
      image: { url: movieData.image },
      caption: caption,
    });

    const messageId = message.key.id;

    // Listen for reply messages
    client.ev.on("messages.upsert", async (update) => {
      const receivedMessage = update.messages[0];
      if (!receivedMessage.message) return;

      const responseText = receivedMessage.message.conversation || receivedMessage.message.extendedTextMessage?.text;
      const keith = receivedMessage.key.remoteJid;

      // Check if the reply is for the original message
      const isReplyToMessage = receivedMessage.message?.extendedTextMessage?.contextInfo?.stanzaId === messageId;

      if (isReplyToMessage) {
        await client.sendMessage(keith, {
          react: { text: '⬇️', key: receivedMessage.key },
        });

        // Determine the selected quality and get the download link
        const qualityMap = {
          '1': "SD 480p",
          '2': "HD 720p",
          '3': "FHD 1080p",
        };

        const selectedQuality = qualityMap[responseText];
        if (!selectedQuality) {
          return m.reply("Invalid option selected.");
        }

        const downloadLink = movieData.ddl_dl.find(link => link.quality === selectedQuality)?.link;
        if (!downloadLink) {
          return m.reply(`Sorry, ${selectedQuality} is not available.`);
        }

        // Send the requested movie as a document
        await client.sendMessage(keith, {
          document: { url: downloadLink },
          mimetype: "video/mp4",
          fileName: `${movieData.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`,
          caption: `*Downloaded by Keith MD*`,
        }, { quoted: receivedMessage });
      }
    });
  } catch (error) {
    console.error(error);
    m.reply('An error occurred while processing your request. Please try again later.');
  }
};
