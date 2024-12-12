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
    
    // If no data is returned or data is undefined
    if (!downloadData || !downloadData.data) {
      return m.reply("No data found for the provided link.");
    }
    
    let videoData = downloadData.data;

    // If no video data is found
    if (videoData.length === 0) {
      return m.reply("No video found at the provided link.");
    }

    // Process the first video entry (or more if needed)
    for (let i = 0; i < Math.min(20, videoData.length); i++) {
      let video = videoData[i];

      // Ensure the video object and URL are defined
      if (!video || !video.url) {
        continue; // Skip this video if data is incomplete
      }

      let videoUrl = video.url;

      // Send video to the chat
      await client.sendMessage(m.chat, {
        video: { url: videoUrl },
        mimetype: "video/mp4",
        caption: "*Instagram Video Downloaded*"
      });
    }
    
  } catch (error) {
    // Catch any errors and send an error message to the user
    console.error(error);
    return m.reply("An error occurred while processing the request. Please try again later.");
  }
};
