const axios = require("axios");
const ytSearch = require("yt-search");

async function downloadAudio(url) {
  try {
    if (!url) {
      throw new Error("URL parameter is required");
    }
    
    const response = await axios.get(`https://api.dylux.xyz/api/yt_audio?url=${url}`);
    const { title, dl_url: downloadLink } = response.data;

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

async function downloadVideo(url, format = '180p') {
  try {
    if (!url) {
      throw new Error("URL parameter is required.");
    }
    
    const response = await axios.get('https://loader.to/api/ajax/download', {
      params: { url, format: format.replace('p', '') },
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    
    const { download_url } = response.data;

    return download_url || null;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}

module.exports = async (messageDetails) => {
  const { client, m: message, text: query } = messageDetails;
  const chatId = message.chat;

  try {
    // Check if query is provided
    if (!query || query.trim().length === 0) {
      return message.reply("Please provide a song or video name.");
    }

    // Perform YouTube search
    const searchResults = await ytSearch(query);

    if (searchResults?.videos?.length > 0) {
      const firstVideo = searchResults.videos[0];
      const videoUrl = firstVideo.url;

      // Download video or audio
      const downloadUrl = await downloadVideo(videoUrl);

      if (downloadUrl) {
        // Send the audio/video file to the user
        await client.sendMessage(chatId, { 
          audio: { url: downloadUrl }, 
          mimetype: 'audio/mp4',
          contextInfo: {
            externalAdReply: {
              title: firstVideo.title,
              body: firstVideo.title,
              mediaType: 1,
              sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
              thumbnailUrl: firstVideo.thumbnail
            }
          }
        }, { quoted: message });

      } else {
        message.reply("Failed to retrieve the download URL.");
      }
    } else {
      message.reply("No video found for the query.");
    }
  } catch (error) {
    message.reply("Error occurred: " + error.message);
  }
};
