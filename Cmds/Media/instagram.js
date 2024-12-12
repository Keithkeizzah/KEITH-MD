const { igdl } = require("ruhend-scraper");

module.exports = async (context) => {
  const { client, m, text } = context;

  // Check if the input text is provided
  if (!text) {
    return m.reply("Please provide an Instagram link for the video.");
  }

  // Check if the provided text contains a valid URL
  if (!text.includes('https://')) {
    return m.reply("That is not a valid Instagram link.");
  }

  try {
    // Download Instagram video data
    let downloadData = await igdl(text);

    // If no data is returned or data is undefined
    if (!downloadData || !downloadData.data) {
      return m.reply("No data found for the provided link.");
    }

    let videoData = downloadData.data;

    // If no video data is found
    if (videoData.length === 0) {
      return m.reply("No video found at the provided link.");
    }

    // Process the first video entry (or more if needed)
    const video = videoData[0]; // Get the first video
    if (!video || !video.url) {
      return m.reply("No valid video URL found.");
    }

    const videoUrl = video.url;

    // Caption without title and duration
    const caption = `
     *𝐊𝐄𝐈𝐓𝐇 𝐌𝐃 𝐈𝐍𝐒𝐓𝐀 𝐃𝐋*
    |__________________________|
    |  
    | *REPLY WITH BELOW NUMBERS*
    |_________________________
    |____  *ɪɴsᴛᴀɢʀᴀᴍ ᴠɪᴅᴇᴏ ᴅʟ*  ____
    |-᳆  1 ᴘʟᴀɪɴ ᴠɪᴅᴇᴏ
    |-᳆  2 ᴅᴏᴄᴜᴍᴇɴᴛᴇᴅ ᴠɪᴅᴇᴏ
    |_________________________
    |____  *ɪɴsᴛᴀɢʀᴀᴍ ᴀᴜᴅɪᴏ ᴅʟ*  ____
    |-᳆  3 ᴀᴜᴅɪᴏ 
    |-᳆  4 ᴅᴏᴄᴜᴍᴇɴᴛ
    |-᳆  5 ᴘᴛᴛ(ᴠᴏɪᴄᴇ)
    |__________________________|
    `;

    // Send caption with instructions
    const message = await client.sendMessage(m.chat, { caption });

    const messageId = message.key.id;

    // Event listener for reply messages
    client.ev.on("messages.upsert", async (update) => {
      const messageContent = update.messages[0];
      if (!messageContent.message) return;

      // Get the response text (from the conversation or extended message)
      const responseText = messageContent.message.conversation || messageContent.message.extendedTextMessage?.text;

      // Check if the message is a reply to the initial message
      const isReplyToMessage = messageContent.message.extendedTextMessage?.contextInfo.stanzaId === messageId;

      if (isReplyToMessage) {
        // React to the message
        await client.sendMessage(m.chat, {
          react: { text: '⬇️', key: messageContent.key },
        });

        // React with an upward arrow
        await client.sendMessage(m.chat, {
          react: { text: '⬆️', key: messageContent.key },
        });

        // Send the requested media based on the user's response
        switch (responseText) {
          case '1': // Plain Video
          case '2': // Documented Video
            await client.sendMessage(m.chat, {
              video: { url: videoUrl },
              caption: `*𝐊𝐄𝐈𝐓𝐇 𝐌𝐃*`,
            }, { quoted: messageContent });
            break;

          case '3': // Audio
            await client.sendMessage(m.chat, {
              audio: { url: videoUrl },
              mimetype: "audio/mpeg",
              caption: `*𝐊𝐄𝐈𝐓𝐇 𝐌𝐃*`,
            }, { quoted: messageContent });
            break;

          case '4': // Document
            await client.sendMessage(m.chat, {
              document: {
                url: videoUrl
              },
              mimetype: "audio/mpeg",
              fileName: `audio.mp3`,
              caption: `*KEITH MD*`
            }, {
              quoted: messageContent
            });
            break;

          case '5': // Voice Note (PTT)
            await client.sendMessage(m.chat, {
              audio: { url: videoUrl },
              mimetype: 'audio/mp4',
              ptt: true,
              caption: `*KEITH MD*`
            }, {
              quoted: messageContent
            });
            break;

          default:
            m.reply("Invalid option. Please reply with one of the numbers listed.");
            break;
        }
      }
    });
  } catch (error) {
    console.error(error);
    m.reply('An error occurred: ' + error.message);
  }
};
