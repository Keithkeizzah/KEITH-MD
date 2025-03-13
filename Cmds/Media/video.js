const yts = require("yt-search");
const fetch = require("node-fetch"); // Ensure 'node-fetch' is imported for API calls

module.exports = async (context) => {
  const { client, m, text, botname, sendReply, sendMediaMessage } = context;

  try {
    // Check if a query is provided
    if (!text) {
      return sendReply(client, m, "Please specify the video you want to download.");
    }

    // Perform a YouTube search with the query
    let search = await yts(text);
    if (!search.all.length) {
      return sendReply(client, m, "No results found for your query.");
    }
    let link = search.all[0].url; // Get the first result's URL

    // Construct the API URL for video download
    const apiUrl = `https://keith-api.vercel.app/download/dlmp4?url=${link}`;

    // Fetch video details from the API
    let response = await fetch(apiUrl);
    let data = await response.json();

    // Check the API response status
    if (data.status && data.result) {
      const videoData = {
        title: data.result.title,
        downloadUrl: data.result.downloadUrl,
        thumbnail: search.all[0].thumbnail,
        format: data.result.format,
        quality: data.result.quality,
      };

      // Send video details and thumbnail to the user
      await sendMediaMessage(client, m, {
        image: { url: videoData.thumbnail },
        caption: `
╭═════════════════⊷
║ *Title*: ${videoData.title}
║ *Format*: ${videoData.format}
║ *Quality*: ${videoData.quality}
╰═════════════════⊷
*Powered by ${botname}*`,
      }, { quoted: m });

      // Send the video to the user
      await client.sendMessage(
        m.chat,
        {
          video: { url: videoData.downloadUrl },
          mimetype: "video/mp4",
          caption: `Here is your video: ${videoData.title}`,
        },
        { quoted: m }
      );

      return;
    } else {
      // If API returns an error or invalid data
      return sendReply(client, m, "Unable to fetch the video. Please try again later.");
    }
  } catch (error) {
    // Handle any unexpected errors
    return sendReply(client, m, `An error occurred: ${error.message}`);
  }
};
