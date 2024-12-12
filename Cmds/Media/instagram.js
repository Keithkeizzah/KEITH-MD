const { igdl } = require("ruhend-scraper");
const axios = require('axios');

module.exports = async ( context) => {
  const { client, m, text, from, quoted } = context;

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
    let videoData = downloadData.data;

    // Process the first 20 video entries
    for (let i = 0; i < Math.min(20, videoData.length); i++) {
      let video = videoData[i];
      let videoUrl = video.url;

      // React with an upward arrow emoji
      await m.react('⬆️');

      // Send video to the chat
      await fetchJson.sendMessage(from, {
        video: {
          url: videoUrl
        },
        mimetype: "video/mp4",
        caption: "*𝐊𝐄𝐈𝐓𝐇-𝐌𝐃*"
      }, {
        quoted: quoted
      });

      // React with a checkmark emoji after sending the video
      await m.react('✅');
    }
  } catch (error) {
    console.log("Error:", error);
    return m.reply("An error occurred while fetching the video. Please try again later.");
  }
};

async function extractVideoData(url) {
  try {
    const response = await axios.get(url);
    const $ = require('cheerio').load(response.data);

    const title = $("meta[property='og:title']").attr('content');
    const duration = $("meta[property='og:duration']").attr("content");
    const image = $("meta[property='og:image']").attr("content");
    const videoType = $("meta[property='og:video:type']").attr("content");
    const videoWidth = $("meta[property='og:video:width']").attr("content");
    const videoHeight = $("meta[property='og:video:height']").attr('content');
    const metadata = $("span.metadata").text();
    const scriptContent = $("#video-player-bg > script:nth-child(6)").html();

    const videoFiles = {
      low: scriptContent.match("html5player.setVideoUrlLow\\('(.*?)'\\);")?.[1],
      high: scriptContent.match("html5player.setVideoUrlHigh\\('(.*?)'\\);")?.[1],
      HLS: scriptContent.match("html5player.setVideoHLS\\('(.*?)'\\);")?.[1],
      thumb: scriptContent.match("html5player.setThumbUrl\\('(.*?)'\\);")?.[1],
      thumb69: scriptContent.match("html5player.setThumbUrl169\\('(.*?)'\\);")?.[1],
      thumbSlide: scriptContent.match("html5player.setThumbSlide\\('(.*?)'\\);")?.[1],
      thumbSlideBig: scriptContent.match("html5player.setThumbSlideBig\\('(.*?)'\\);")?.[1]
    };

    return {
      status: true,
      result: {
        title,
        URL: url,
        duration,
        image,
        videoType,
        videoWidth,
        videoHeight,
        info: metadata,
        files: videoFiles
      }
    };
  } catch (error) {
    console.log("Error in extractVideoData:", error);
    return { status: false, result: error };
  }
}
