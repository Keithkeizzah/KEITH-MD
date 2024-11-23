
const yts = require("yt-search");
const { youtubedl, youtubedlv2 } = require("api-dylux");


module.exports = async (context) => {
  const { client, m: message, text } = context;

  async function searchVideos(query, options = {}) {
    const searchOptions = {
      query,
      hl: 'es',
      gl: 'ES',
      ...options
    };
    const searchResults = await yts.search(searchOptions);
    return searchResults.videos;
  }

  try {
    if (!text) {
      message.reply("What video do you want to download?");
      return;
    }

    const videos = await searchVideos(text);
    const videoUrl = videos[0].url;

    // Attempt to download the video
    const videoData = await youtubedl(videoUrl).catch(async () => {
      return await youtubedlv2(videoUrl);
    });

    const videoFile = await videoData.video["360p"].download();
    const videoTitle = await videoData.title;

    // Prepare message with video
    const videoMessage = {
      url: videoFile,
      fileName: `${videoTitle}.mp4`,
      mimetype: "video/mp4",
      caption: videoTitle
    };

    await client.sendMessage(message.chat, videoMessage, { quoted: message });

    // Prepare document message
    const documentMessage = {
      document: { url: videoFile },
      fileName: `${videoTitle}.mp4`,
      mimetype: "video/mp4",
      caption: videoTitle
    };

    await client.sendMessage(message.chat, documentMessage, { quoted: message });
  } catch (error) {
    message.reply("Error\n" + error);
  }
};
