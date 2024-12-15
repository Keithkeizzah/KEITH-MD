const axios = require("axios");
const ytSearch = require("yt-search");
const fg = require("api-dylux");  // Correct module for downloading audio

// Function to download audio from a URL using the API
async function downloadAudio(url) {
  try {
    if (!url) {
      throw new Error("URL parameter is required");
    }
    
    const response = await fg.yta(url);
    const title = response.title;
    const downloadLink = response.dl_url;

    return {
      status: true,
      createdBy: "Prabath Kumara (prabathLK)",
      title: title,
      downloadLink: downloadLink
    };
  } catch (error) {
    console.error("Error fetching audio:", error);
    return null;
  }
}

module.exports = async (context) => {
  const { client, m: message, text } = context;
  const chatId = message.chat;

  try {
    // Check if a query is provided
    if (!text) {
      return message.reply("What song do you want to download?");
    }

    // Perform a YouTube search based on the query
    const searchResults = await ytSearch(text);

    // If results are found
    if (searchResults && searchResults.videos.length > 0) {
      const firstVideo = searchResults.videos[0];
      const videoUrl = firstVideo.url;

      // Request to download audio from the URL
      const downloadResponse = await downloadAudio(videoUrl);

      // If the download URL is successfully retrieved
      if (downloadResponse && downloadResponse.status === true) {
        const downloadUrl = downloadResponse.downloadLink;
        const videoDetails = downloadResponse;

        // Inform the user that the download is starting
        await client.sendMessage(chatId, { text: "*Downloading...*" }, { quoted: message });

        // Send a message with video details (title, duration, artist)
        const messageText = `
          *ᴋᴇɪᴛʜ ᴍᴅ ᴀᴜᴅɪᴏ ᴅʟ*
        ╭─────────────────
         ⎢ *ᴛɪᴛʟᴇ :* "${videoDetails.title}"
         ⎢ *ᴅᴜʀᴀᴛɪᴏɴ :* ${firstVideo.timestamp}
         ⎢ *ᴠɪᴇᴡꜱ :* ${firstVideo.views}
         ⎢ *artist :* ${firstVideo.author.name}
        ╰─────────────────
         𝐑𝐞𝐩𝐥𝐲 𝐰𝐢𝐭𝐡 𝐛𝐞𝐥𝐨𝐰 𝐧𝐮𝐦𝐛𝐞𝐫𝐬 𝐭𝐨 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝:
               *1*     ┃  ᴀᴜᴅɪᴏ
               *2*     ┃  ᴅᴏᴄᴜᴍᴇɴᴛᴇᴅ (ᴍ4ᴀ)
               *3*     ┃  ᴅᴏᴄᴜᴍᴇɴᴛᴇᴅ (ᴍᴘ3)
        `; 

        const messageSent = await client.sendMessage(m.chat, {
          image: { url: firstVideo.thumbnail },
          caption: messageText
        });

        const messageId = messageSent.key.id;

        // Handle the user's reply to download options
        client.ev.on("messages.upsert", async (event) => {
          const messageData = event.messages[0];
          if (!messageData.message) {
            return;
          }

          const messageContent = messageData.message.conversation || messageData.message.extendedTextMessage?.["text"];
          const isReplyToDownloadPrompt = messageData.message.extendedTextMessage && messageData.message.extendedTextMessage.contextInfo.stanzaId === messageId;

          if (isReplyToDownloadPrompt) {
            await client.sendMessage(chatId, {
              react: { text: '⬇️', key: messageData.key }
            });

            switch (messageContent) {
              case '1': // Audio
                await client.sendMessage(chatId, {
                  audio: { url: downloadUrl },
                  mimetype: "audio/mp4",
                  contextInfo: {
                    externalAdReply: {
                      title: videoDetails.title,
                      body: videoDetails.title,
                      mediaType: 1,
                      sourceUrl: videoUrl,
                      thumbnailUrl: firstVideo.thumbnail,
                      renderLargerThumbnail: true,
                      showAdAttribution: true
                    }
                  }
                }, { quoted: messageData });
                break;

              case '2': // M4A Document
                await client.sendMessage(chatId, {
                  document: { url: downloadUrl },
                  mimetype: "audio/mp4",
                  contextInfo: {
                    externalAdReply: {
                      title: videoDetails.title,
                      body: videoDetails.title,
                      mediaType: 1,
                      sourceUrl: videoUrl,
                      thumbnailUrl: firstVideo.thumbnail,
                      renderLargerThumbnail: true,
                      showAdAttribution: true
                    }
                  }
                }, { quoted: messageData });
                break;

              case '3': // MP3 Document
                await client.sendMessage(chatId, {
                  document: { url: downloadUrl },
                  mimetype: "audio/mpeg",
                  fileName: `${videoDetails.title}.mp3`,
                  caption: "*ᴅᴏᴡɴʟᴏᴀᴅᴇᴅ ʙʏ ᴋᴇɪᴛʜ*"
                }, { quoted: messageData });
                break;

              default:
                await client.sendMessage(chatId, {
                  text: 'Invalid option selected. Please reply with a valid number (1-3).'
                });
            }
          }
        });
      }
    } else {
      message.reply("No results found for your search.");
    }
  } catch (err) {
    console.log(err);
    m.reply(`Error: ${err.message}`);
  }
};
