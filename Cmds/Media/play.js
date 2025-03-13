const yts = require("yt-search");

module.exports = async (context) => {
  const { client, m, text, sendReply, sendMediaMessage } = context;

  try {
    if (!text) return sendReply(client, m, "What song do you want to download?");

    let search = await yts(text);
    let link = search.all[0].url;

    // Construct the API URL with the given format
    const apiUrl = `https://keithapi.vercel.app/download/dlmp3?url=${link}`;

    try {
      let response = await fetch(apiUrl);
      let data = await response.json();

      if (data.status) {
        let songData = {
          title: data.result.title,
          thumbnail: search.all[0].thumbnail,
          videoUrl: link,
          downloadUrl: data.result.downloadUrl
        };

        // Send song details and media
        await sendMediaMessage(client, m, {
          image: { url: songData.thumbnail },
          caption: `
     ╭═════════════════⊷
     ║ *Title*: *${songData.title}*
     ║ *Url*: *${songData.videoUrl}*
     ╰═════════════════⊷`
        }, { quoted: m });

        await client.sendMessage(
          m.chat,
          {
            audio: { url: songData.downloadUrl },
            mimetype: "audio/mp3",
          },
          { quoted: m }
        );

        await client.sendMessage(
          m.chat,
          {
            document: { url: songData.downloadUrl },
            mimetype: "audio/mp3",
            fileName: `${songData.title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp3`,
          },
          { quoted: m }
        );

        return;
      }
    } catch (error) {
      sendReply(client, m, "An error occurred while fetching the song. Please try again later.");
    }
  } catch (error) {
    sendReply(client, m, "Download failed\n" + error.message);
  }
};
