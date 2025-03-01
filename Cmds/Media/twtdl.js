module.exports = async (context) => {
  const { client, m, text, botname } = context;

  if (!text) return m.reply("Provide a Twitter link for the video");

  if (!text.includes('twitter.com') && !text.includes('x.com')) return m.reply("That is not a Twitter link.");

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
            await client.sendMessage(m.chat, { 
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
    m.reply("An error occurred. All APIs might be down or unable to process the request.");
  } catch (e) {
    m.reply("An error occurred: " + e);
  }
};
