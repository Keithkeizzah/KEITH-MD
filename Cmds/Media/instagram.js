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
    let videoData = downloadData.data;

    // If no video data is returned
    if (!videoData || videoData.length === 0) {
      return m.reply("No video found at the provided link.");
    }

    // Process the first video entry (or more if needed)
    for (let i = 0; i < Math.min(20, videoData.length); i++) {
      let video = videoData[i];
      let videoUrl = video.url;

      // Send video to the chat
      await client.sendMessage(m.chat, {
        video: { url: videoUrl },
        mimetype: "video/mp4",
        caption: "*Instagram Video Downloaded*"
      });

      // React with a checkmark emoji after sending the video
      await m.react('✅');
    }
  } catch (error) {
    console.log("Error:", error);
    return m.reply("An error occurred while fetching the video. Please try again later.");
  }
};
