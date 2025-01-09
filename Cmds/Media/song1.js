const axios = require("axios");
const fg = require("api-dylux");
const ytSearch = require("yt-search");
const fs = require("fs");
const path = require("path");

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
      createdBy: "Keithkeizzah",
      title: title,
      downloadLink: downloadLink
    };
  } catch (error) {
    console.error("Error fetching audio:", error);
    return null;
  }
}

module.exports = async (messageDetails) => {
  const { client, m: message, text: query } = messageDetails;
  const chatId = message.chat;

  try {
    // Check if a query is provided
    if (!query || query.trim().length === 0) {
      return message.reply("What song or video do you want to download?");
    }

    // Perform a YouTube search based on the query
    const searchResults = await ytSearch(query);

    // If results are found
    if (searchResults && searchResults.videos.length > 0) {
      const firstVideo = searchResults.videos[0];
      const videoUrl = firstVideo.url;

      // Download the audio
      const audioData = await downloadAudio(videoUrl);

      // If the audio download URL is successfully retrieved
      if (audioData && audioData.downloadLink) {
        const inputPath = path.join(__dirname, 'downloaded_audio.mp3');

        // Download the audio and save it locally
        const writer = fs.createWriteStream(inputPath);
        const audioStream = axios.get(audioData.downloadLink, { responseType: 'stream' }).data.pipe(writer);
        
        audioStream.on('finish', async () => {
          try {
            // Send the audio to the user
            await client.sendMessage(chatId, { audio: { url: inputPath }, mimetype: "audio/mp3" }, { quoted: message });
          } catch (err) {
            console.error("Error sending audio:", err);
            message.reply("Failed to send the audio.");
          } finally {
            // Clean up the downloaded audio file
            fs.unlinkSync(inputPath);
          }
        });
      } else {
        message.reply("Failed to retrieve the audio download link.");
      }
    } else {
      message.reply("No video found for the specified query.");
    }
  } catch (error) {
    message.reply("Download failed\n" + error);
  }
};
