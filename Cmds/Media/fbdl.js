const { facebook } = require('@mrnima/facebook-downloader');

module.exports = async (context) => {
  const { client, m, text } = context;

  if (!text) return m.reply("Provide a Facebook link for the video");

  if (!text.includes('facebook.com')) return m.reply("That is not a Facebook link.");

  try {
    // Download the Facebook video data
    let fbData = await facebook(text);

    if (!fbData || !fbData.result) {
      return m.reply("Unable to fetch video data. Please check the link and try again.");
    }

    // Extract video details from fbData
    const { title, image, dl_link } = fbData.result;

    const caption = `
     *𝐊𝐄𝐈𝐓𝐇 𝐌𝐃 𝐅𝐁 𝐃𝐋*
    |__________________________|
    |-᳆        *ᴛɪᴛʟᴇ*  
     ${title}
    |_________________________
    ʀᴇᴘʟʏ ᴡɪᴛʜ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀs 
    |-᳆  1 sᴅ ǫᴜᴀʟɪᴛʏ
    |-᳆  2 ʜᴅ ǫᴜᴀʟɪᴛʏ
    |-᳆  3 ᴀᴜᴅɪᴏ
    |__________________________|
    `;

    // Send the image and caption with a reply
    const message = await client.sendMessage(m.chat, {
      image: { url: image },
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

        // Handle the media request based on the user's response
        if (responseText === '1') {
          await client.sendMessage(keith, {
            video: { url: dl_link.download_mp4_1 },
            caption: "*𝐊𝐄𝐈𝐓𝐇 𝐌𝐃*",
          }, { quoted: messageContent });
        } else if (responseText === '2') {
          await client.sendMessage(keith, {
            video: { url: dl_link.download_mp4_2 },
            caption: "*𝐊𝐄𝐈𝐓𝐇 𝐌𝐃*",
          }, { quoted: messageContent });
        } else if (responseText === '3') {
          await client.sendMessage(keith, {
            audio: { url: dl_link.download_mp3 },
            mimetype: "audio/mpeg",
          }, { quoted: messageContent });
        }
        
        // React again after sending media
        await client.sendMessage(keith, {
          react: { text: '⬆️', key: messageContent.key },
        });
      }
    });
  } catch (error) {
    console.error(error);
    m.reply('An error occurred: ' + error.message);
  }
};
