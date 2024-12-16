const ytSearch = require('yt-search');
const fetch = require('node-fetch');

module.exports = async (messageDetails) => {
  const { client, m: message, text: query } = messageDetails;
  const chatId = message.chat;

  // Function to attempt download from Gifted API
  const getDownloadFromGifted = async (videoUrl) => {
    const response = await fetch(`https://api.giftedtech.my.id/api/download/dlmp4?url=${encodeURIComponent(videoUrl)}&apikey=gifted`);
    return response.json();
  };

  // Function to attempt download from Yasiya API
  const getDownloadFromYasiya = async (videoUrl) => {
    const response = await fetch(`https://www.dark-yasiya-api.site/download/ytmp3?url=${encodeURIComponent(videoUrl)}`);
    return response.json();
  };

  // Function to attempt download from Dreaded API
  const getDownloadFromDreaded = async (videoUrl) => {
    const response = await fetch(`https://api.dreaded.site/api/ytdl/video?query=${encodeURIComponent(videoUrl)}`);
    return response.json();
  };

  try {
    // Check if a query is provided
    if (!query || query.trim().length === 0) {
      return message.reply('Please provide a song to download.');
    }

    // Perform a YouTube search based on the query
    const searchResults = await ytSearch(query);

    // Check if any videos were found
    if (searchResults && searchResults.videos.length > 0) {
      const firstVideo = searchResults.videos[0];
      const videoUrl = firstVideo.url;

      // Try downloading from Gifted API first
      let downloadData = await getDownloadFromGifted(videoUrl);
      
      // If Gifted API fails, try Yasiya API
      if (!downloadData.success) {
        console.log('Gifted API failed, trying Yasiya API...');
        downloadData = await getDownloadFromYasiya(videoUrl);
      }

      // If Yasiya API fails, try Dreaded API
      if (!downloadData.success) {
        console.log('Yasiya API failed, trying Dreaded API...');
        downloadData = await getDownloadFromDreaded(videoUrl);
      }

      // Check if any API was successful
      if (downloadData.success) {
        const downloadUrl = downloadData.result.download_url;
        const videoDetails = downloadData.result;

        const videoInfo = {
          image: { url: firstVideo.thumbnail },
          caption: `
     ᴋᴇɪᴛʜ ᴍᴅ sᴏɴɢ ᴅʟ
╭───────────────◆
│ *Title:* ${videoDetails.title}
│ *Duration:* ${firstVideo.timestamp}
│ *Artist:* ${firstVideo.author.name}
╰────────────────◆
`
        };
        await client.sendMessage(chatId, videoInfo, { quoted: message });

        // Send the video file to the user
        await client.sendMessage(chatId, { audio: { url: downloadUrl }, mimetype: 'audio/mp4' }, { quoted: message });

        // Optionally, send the video as a document
        await client.sendMessage(chatId, { document: { url: downloadUrl }, mimetype: 'audio/mp4' }, { quoted: message });
      } else {
        message.reply('Failed to retrieve download URL from all sources. Please try again later.');
      }
    } else {
      message.reply('No video found for the specified query.');
    }
  } catch (error) {
    message.reply(`Download failed due to an error: ${error.message || error}`);
  }
};
