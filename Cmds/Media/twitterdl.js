module.exports = async (context) => {
  const { client, m, text, botname, sendReply, sendMediaMessage } = context;

  if (!text) return sendReply(client, m, "Provide a Twitter link for the video");

  if (!text.includes('twitter.com') && !text.includes('x.com')) return sendReply(client, m, "That is not a Twitter link.");

  const apis = [
    `https://apis.davidcyriltech.my.id/twitter?url=${text}`,
    `https://api.giftedtech.my.id/api/download/twitter?apikey=gifted&url=${text}`,
    `https://api.ryzendesu.vip/api/downloader/twitter?url=${text}`
  ];

  try {
    for (const api of apis) {
      try {
        const response = await fetch(api);
        const data = await response.json();
        
        // Checking if the API response is successful
        if (data.status === 200 || data.success) {
          // Extracting the video URL
          const videoUrl = data.video_hd || data.video_sd || data.media?.[0]?.url;
          
          if (videoUrl) {
            await sendMediaMessage(client, m, { 
              video: { url: videoUrl }, 
              gifPlayback: false 
            }, { quoted: m });
            return;
          }
        }
      } catch (e) {
        // Continue to the next API if one fails
        continue;
      }
    }

    // If no APIs succeeded
    sendReply(client, m, "An error occurred. All APIs might be down or unable to process the request.");
  } catch (e) {
    sendReply(client, m, "An error occurred: " + e);
  }
};
