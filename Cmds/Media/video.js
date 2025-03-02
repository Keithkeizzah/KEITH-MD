
const ytSearch = require('yt-search');
const fetch = require('node-fetch');


module.exports = async (messageDetails) => {
  const { client, m: message, text: query, sendReply, sendMediaMessage } = messageDetails;
  const chatId = message.chat;

  
  const getDownloadData = async (apiUrl) => {
    const response = await fetch(apiUrl);
    return response.json();
  };

  try {
    
    if (!query || query.trim().length === 0) {
      return sendReply(client, message, 'Please provide a song to download.'); // Use sendReply for text replies
    }

    
    const searchResults = await ytSearch(query);

    
    if (!searchResults || !searchResults.videos.length) {
      return sendReply(client, message, 'No video found for the specified query.'); // Use sendReply for text replies
    }

    const firstVideo = searchResults.videos[0];
    const videoUrl = firstVideo.url;

    
    let downloadData;
    let downloadUrl;
    let videoDetails;

   
    downloadData = await getDownloadData(`https://api.giftedtech.web.id/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=gifted`);
    if (downloadData.success) {
      downloadUrl = downloadData.result.download_url;
      videoDetails = downloadData.result;
    } else {
      
      downloadData = await getDownloadData(`https://www.dark-yasiya-api.site/download/ytmp4?url=${encodeURIComponent(videoUrl)}`);
      if (downloadData.success) {
        downloadUrl = downloadData.result.download_url;
        videoDetails = downloadData.result;
      } else {
        
        downloadData = await getDownloadData(`https://api.dreaded.site/api/ytdl/video?query=${encodeURIComponent(videoUrl)}`);
        if (downloadData.success) {
          downloadUrl = downloadData.result.download_url;
          videoDetails = downloadData.result;
        }
      }
    }

    
    if (!downloadUrl || !videoDetails) {
      return sendReply(client, message, 'Failed to retrieve download URL from all sources. Please try again later.'); // Use sendReply for text replies
    }

    
    const messagePayload = {
      video: { url: downloadUrl },
      mimetype: 'video/mp4',
      contextInfo: {
        externalAdReply: {
          title: videoDetails.title,
          body: videoDetails.title,
          mediaType: 1,
          sourceUrl: 'https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47',
          thumbnailUrl: firstVideo.thumbnail,
          renderLargerThumbnail: false,
          showAdAttribution: true,
        },
      },
    };

    
    await sendMediaMessage(client, message, messagePayload);

  } catch (error) {
    console.error('Error during download process:', error);
    return sendReply(client, message, `Download failed due to an error: ${error.message || error}`); // Use sendReply for error messages
  }
};
