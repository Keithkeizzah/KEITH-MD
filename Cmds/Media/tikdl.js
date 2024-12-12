const { downloadTiktok } = require('@mrnima/tiktok-downloader');

module.exports = async (context) => {
  const { client, m, text } = context;

  if (!text) return m.reply("Provide a tiktok link for the video");

  if (!text.includes('tiktok.com')) return m.reply("That is not a tiktok link.");

  try {
    // Download the tiktok video data
    let tiktokData = await downloadTiktok(text);

    const caption = `
𝐊𝐄𝐈𝐓𝐇 𝐌𝐃 𝐓𝐈𝐊𝐓𝐎𝐊 𝐃𝐋
*𝐓𝐢𝐭𝐥𝐞*:  ${tiktokData.result.title}

*🔢 ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴛʜᴇ ɴᴜᴍʙᴇʀ*

*𝐕𝐢𝐝𝐞𝐨 𝐟𝐢𝐥𝐞* 🎬

*1* ┃ *ꜱᴅ Qᴜᴀʟɪᴛʏ*
*2* ┃ *ʜᴅ Qᴜᴀʟɪᴛʏ*

*𝐀𝐮𝐝𝐢𝐨 𝐟𝐢𝐥𝐞* 🎧

*3* ┃ *ᴀᴜᴅɪᴏ*

> 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐤𝐞𝐢𝐭𝐡𝐤𝐞𝐢𝐳𝐳𝐚𝐡
    `;

    // Send the image and caption with a reply
    const message = await client.sendMessage(m.chat, {
      image: { url: tiktokData.result.image },
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

        const tiktokLinks = tiktokData.result;

        await client.sendMessage(keith, {
          react: { text: '⬆️', key: messageContent.key },
        });

        // Send the requested media based on the user's response
        if (responseText === '1') {
          await client.sendMessage(keith, {
            video: { url: tiktokLinks.dl_link.download_mp4_1 },
            caption: "*𝐊𝐄𝐈𝐓𝐇 𝐌𝐃*",
          }, { quoted: messageContent });
        } else if (responseText === '2') {
          await client.sendMessage(keith, {
            video: { url: tiktokLinks.dl_link.download_mp4_2 },
            caption: "*𝐊𝐄𝐈𝐓𝐇 𝐌𝐃*",
          }, { quoted: messageContent });
        } else if (responseText === '3') {
          await client.sendMessage(keith, {
            audio: { url: tiktokLinks.dl_link.download_mp3 },
            mimetype: "audio/mpeg",
          }, { quoted: messageContent });
        }
      }
    });
  } catch (error) {
    console.error(error);
    m.reply('An error occurred: ' + error.message);
  }
};
