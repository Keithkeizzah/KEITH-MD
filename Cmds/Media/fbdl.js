const { facebook } = require('@mrnima/facebook-downloader');

module.exports = async (context) => {
  const { client, m, text } = context;

  // Check if the input text is provided
  if (!text) {
    return m.reply("Provide a TikTok link for the video");
  }

  // Check if the provided text contains a valid URL
  if (!text.includes('https://')) {
    return m.reply("That is not a TikTok link.");
  }

  try {
    // Download the TikTok video data
    const videoData = await facebook(text);

    // Prepare the message caption with video details
    const caption = `
     *𝐊𝐄𝐈𝐓𝐇 𝐌𝐃 𝐓𝐈𝐊𝐓𝐎𝐊 𝐃𝐋*
    |__________________________|
    |-᳆        *ᴅᴜʀᴀᴛɪᴏɴ*  
     ${videoData.result.duration}
    |_________________________
    | REPLY WITH BELOW NUMBERS
    |_________________________
    |____  *ғᴀᴄᴇʙᴏᴋ ᴠᴅᴇᴏ ᴅʟ*  ____
    |-᳆  1 sᴅ ǫᴜᴀʟɪᴛʏ
    |-᳆  2 ʜᴅ ǫᴜᴀʟɪᴛʏ
    |_________________________
    |____  *ғᴀᴄᴇʙᴏᴋ ᴀᴜᴅɪᴏ ᴅʟ*  ____
    |-᳆  3 ᴀᴜᴅɪᴏ
    |-᳆  4 ᴅᴏᴄᴜᴍᴇɴᴛ
    |-᳆  5 ᴘᴛᴛ(ᴠᴏɪᴄᴇ)
    |__________________________|
    `;

    // Send the image and caption with a reply
    const message = await client.sendMessage(m.chat, {
      image: { url: videoData.result.thumbnail },
      caption: caption,
    });

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

        // Extract video details
        const videoDetails = videoData.result;

        // React with an upward arrow
        await client.sendMessage(m.chat, {
          react: { text: '⬆️', key: messageContent.key },
        });

        // Send the requested media based on the user's response
        if (responseText === '1') {
          await client.sendMessage(m.chat, {
            video: { url: videoDetails.links.SD },
            caption: "*𝐊𝐄𝐈𝐓𝐇 𝐌𝐃*",
          }, { quoted: messageContent });
        } else if (responseText === '2') {
          await client.sendMessage(m.chat, {
            video: { url: videoDetails.links.HD },
            caption: "*𝐊𝐄𝐈𝐓𝐇 𝐌𝐃*",
          }, { quoted: messageContent });
        } else if (responseText === '3') {
          await client.sendMessage(m.chat, {
            audio: { url: videoDetails.links.SD },
            mimetype: "audio/mpeg",
          }, { quoted: messageContent });
        } else if (responseText === '4') {
          await client.sendMessage(m.chat, {
            document: {
              url: videoDetails.links.SD
            },
            mimetype: "audio/mpeg",
            fileName: "Keith/fb.mp3",
            caption: "*KEITH MD*"
          }, {
            quoted: messageContent
          });
        } else if (responseText === '5') {
          await client.sendMessage(m.chat, {
            audio: {
              url: videoDetails.links.SD
            },
            mimetype: 'audio/mp4',
            ptt: true
          }, {
            quoted: messageContent
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
    m.reply('An error occurred: ' + error.message);
  }
};
