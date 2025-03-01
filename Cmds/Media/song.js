const yts = require("yt-search");
const axios = require("axios");

module.exports = async (context) => {
  const { client, m, text, fetchJson, botname, sendReply, sendMediaMessage } = context;

  try {
    if (!text) return sendReply(client, m, "What song do you want to download?");

    let search = await yts(text);
    let link = search.all[0].url;

    const apis = [
      `https://apis.davidcyriltech.my.id/youtube/mp3?url=${link}`,
      `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${link}`
    ];

    for (const api of apis) {
      try {
        let data = await fetchJson(api);

        // Checking if the API response is successful
        if (data.status === 200 || data.success) {
          let videoUrl = data.result?.downloadUrl || data.url;

          let songData = {
            title: data.result?.title || search.all[0].title,
            artist: data.result?.author || search.all[0].author.name,
            thumbnail: data.result?.image || search.all[0].thumbnail,
            videoUrl: link
          };

          await sendMediaMessage(client, m, {
            image: { url: songData.thumbnail },
            caption: `
     ╭═════════════════⊷
     ║ *Title*: *${songData.title}*
     ║ *Artist*: *${songData.artist}*
     ║ *Url*: *${songData.videoUrl}*
     ╰═════════════════⊷
      *Powered by ${botname}*`
          }, { quoted: m });

          await client.sendMessage(
            m.chat,
            {
              audio: { url: videoUrl },
              mimetype: "audio/mp4",
             
            },
            { quoted: m }
          );

          await client.sendMessage(
            m.chat,
            {
              document: { url: videoUrl },
              mimetype: "audio/mp3",
              fileName: `${songData.title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp3`,
            },
            { quoted: m }
          );

          return;
        }
      } catch (e) {
        // Continue to the next API if one fails
        continue;
      }
    }

    // If no APIs succeeded
    sendReply(client, m, "An error occurred. All APIs might be down or unable to process the request.");
  } catch (error) {
    sendReply(client, m, "Download failed\n" + error.message);
  }
};
