const axios = require('axios');

module.exports = async (context) => {
  const { client, m, text } = context;

  if (!text) return m.reply("Provide a sinhalasub movie link");

  if (!text.includes('https://sinhalasub.lk/movies/')) return m.reply("That is not a valid sinhalasub movie link.");

  try {
    // Fetch movie data from the API
    const apiUrl = `https://apis-keith.vercel.app/movie/sinhalasub/movie?url=${text}`;
    const response = await axios.get(apiUrl);
    const movieData = response.data.result.data;

    const caption = `
     *𝐊𝐄𝐈𝐓𝐇 𝐌𝐃 𝐌𝐎𝐕𝐈𝐄 𝐃𝐋*
    |__________________________|
    |-᳆        *ᴛɪᴛʟᴇ*: ${movieData.title}
    |_________________________
    ʀᴇᴘʟʏ ᴡɪᴛʜ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀs 
    |-᳆  1 SD 480p
    |-᳆  2 HD 720p
    |-᳆  3 FHD 1080p
    |__________________________|
    `;

    // Send the image and caption with a reply
    const message = await client.sendMessage(m.chat, {
      image: { url: movieData.image },
      caption: caption,
    });

    const messageId = message.key.id;

    // Event listener for reply messages
    client.ev.on("messages.upsert", async (update) => {
      const messageContent = update.messages[0];
      if (!messageContent.message) return;

      const responseText = messageContent.message.conversation || messageContent.message.extendedTextMessage?.text;
      const keith = messageContent.key.remoteJid;

      // Check if the response is a reply to the message we sent
      const isReplyToMessage = messageContent.message.extendedTextMessage?.contextInfo.stanzaId === messageId;

      if (isReplyToMessage) {
        // React to the message
        await client.sendMessage(keith, {
          react: { text: '⬇️', key: messageContent.key },
        });

        // Determine the selected quality
        let downloadLink;
        if (responseText === '1') {
          downloadLink = movieData.ddl_dl.find(link => link.quality === "SD 480p").link;
        } else if (responseText === '2') {
          downloadLink = movieData.ddl_dl.find(link => link.quality === "HD 720p").link;
        } else if (responseText === '3') {
          downloadLink = movieData.ddl_dl.find(link => link.quality === "FHD 1080p").link;
        } else {
          return m.reply("Invalid option selected.");
        }

        // Send the requested media as a document
        await client.sendMessage(keith, {
          document: { url: downloadLink },
          mimetype: "video/mp4",
          fileName: `${movieData.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`, // Clean up the title for use as a filename
          caption: `*Downloaded by Keith MD*`,
        }, { quoted: messageContent });
      }
    });
  } catch (error) {
    console.error(error);
    m.reply('An error occurred: ' + error.message);
  }
};
