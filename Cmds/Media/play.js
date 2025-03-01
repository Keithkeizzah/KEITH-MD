const yts = require("yt-search");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = async (context) => {
  const { client, m, text, fetchJson, sendReply, sendMediaMessage } = context;

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
          let outputFileName = `${search.all[0].title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp3`;
          let outputPath = path.join(__dirname, outputFileName);

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
            > downloaded by ${botname}`
          }, { quoted: m });

          const response = await axios({
            url: videoUrl,
            method: "GET",
            responseType: "stream"
          });

          if (response.status !== 200) {
            sendReply(client, m, "We are sorry but the API endpoint didn't respond correctly. Try again later.");
            continue;
          }

          ffmpeg(response.data)
            .toFormat("mp3")
            .save(outputPath)
            .on("end", async () => {
              await client.sendMessage(
                m.chat,
                {
                  audio: { url: outputPath },
                  mimetype: "audio/mp3",
                  fileName: outputFileName,
                },
                { quoted: m }
              );
              fs.unlinkSync(outputPath);
            })
            .on("error", (err) => {
              m.reply("Download failed\n" + err.message);
            });

          return;
        }
      } catch (e) {
        continue;
      }
    }

    sendReply(client, m, "An error occurred. All APIs might be down or unable to process the request.");
  } catch (error) {
    sendReply(client, m, "Download failed\n" + error.message);
  }
};
