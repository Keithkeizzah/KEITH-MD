const fetch = require("node-fetch");
const fs = require("fs");
const { exec } = require("child_process");

module.exports = async (context) => {
  const { client, m, text, botname, sendReply, sendMediaMessage } = context;

  try {
    // Check if the user provided a search query
    if (!text) {
      return sendReply(client, m, "Please specify the video you want to download.");
    }

    // Search for Sinhala subtitles using the provided API
    const searchUrl = `https://apis-keith.vercel.app/movie/sinhalasub/search?text=${encodeURIComponent(text)}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    // Check if the search was successful and if there are any results
    if (!searchData.status || !searchData.result.data.length) {
      return sendReply(client, m, "No results found for your query.");
    }

    // Get the first result from the search
    const firstResult = searchData.result.data[0];
    const movieUrl = firstResult.link;

    // Fetch the download links using the movie URL
    const downloadUrl = `https://apis-keith.vercel.app/movie/sinhalasub/movie?url=${encodeURIComponent(movieUrl)}`;
    const downloadResponse = await fetch(downloadUrl);
    const downloadData = await downloadResponse.json();

    // Check if the download data was fetched successfully
    if (!downloadData.status || !downloadData.result.data) {
      return sendReply(client, m, "Unable to fetch the video. Please try again later.");
    }

    // Extract relevant information from the download data
    const videoData = downloadData.result.data;

    // Choose the SD 480p quality (smallest and fastest to download)
    const downloadLink = videoData.pixeldrain_dl.find((link) => link.quality === "SD 480p").link;

    // Download the video file
    const videoPath = `./${videoData.title.replace(/[^a-zA-Z0-9]/g, "_")}.mp4`;
    const downloadCommand = `curl -o "${videoPath}" "${downloadLink}"`;

    exec(downloadCommand, async (error) => {
      if (error) {
        return sendReply(client, m, "Failed to download the video. Please try again later.");
      }

      // Send the video as a document
      await client.sendMessage(
        m.chat,
        {
          document: fs.readFileSync(videoPath),
          mimetype: "video/mp4",
          fileName: `${videoData.title}.mp4`,
          caption: `Here is your video: ${videoData.title}`,
        },
        { quoted: m }
      );

      // Delete the downloaded file after sending
      fs.unlinkSync(videoPath);
    });

  } catch (error) {
    // Handle any errors that occur during the process
    return sendReply(client, m, `An error occurred: ${error.message}`);
  }
};
