const axios = require("axios");
const ytSearch = require("yt-search");
const fg = require("api-dylux");  // Correct module for downloading audio

// Function to download audio from a URL using the API
async function downloadAudio(url) {
  try {
    if (!url) {
      throw new Error("URL parameter is required");
    }
    
    const response = await fg.yta(url); // Fetching audio details
    const title = response.title;
    const downloadLink = response.dl_url;

    return {
      status: true,
      createdBy: "Prabath Kumara (prabathLK)",
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
      return message.reply("What song do you want to download?");
    }

    // Perform a YouTube search based on the query
    const searchResults = await ytSearch(query);

    // If results are found
    if (searchResults && searchResults.videos.length > 0) {
      const firstVideo = searchResults.videos[0];
      const videoUrl = firstVideo.url;

      // Request to download audio from the URL
      const downloadResponse = await downloadAudio(videoUrl);

      // If the download URL is successfully retrieved
      if (downloadResponse && downloadResponse.status === true) {
        const downloadUrl = downloadResponse.downloadLink;
        const videoDetails = downloadResponse;

        // Inform the user that the download is starting
        await client.sendMessage(chatId, { text: "*Downloading...*" }, { quoted: message });

        // Send a message with video details (title, artist)
        const videoInfo = {
          image: { url: firstVideo.thumbnail },
          caption: `*KEITH-MD AUDIO PLAYER*\n\n╭───────────────◆\n│ *Title:* ${videoDetails.title}\n│ *Artist:* ${firstVideo.author.name}\n╰────────────────◆`
        };
        await client.sendMessage(chatId, videoInfo, { quoted: message });

        // Send the audio file (as MP3) to the user
        const fileName = `${videoDetails.title}.mp3`;
        await client.sendMessage(chatId, { 
          document: { url: downloadUrl }, 
          mimetype: "audio/mpeg", 
          fileName: fileName 
        }, { quoted: message });

        // Inform the user that the download was successful
        await message.reply(`*${videoDetails.title}*\n\n*Downloaded successfully. Keep using Keith MD*`);
      } else {
        message.reply("Failed to retrieve download URL.");
      }
    } else {
      message.reply("No video found for the specified query.");
    }
  } catch (error) {
    console.error(error);
    message.reply("Download failed. Please try again later.");
  }
};
