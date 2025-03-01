module.exports = async (context) => {
  const { client, m, text, botname } = context;

  if (!text) return m.reply("Provide a TikTok link for the video");

  if (!text.includes('tiktok.com')) return m.reply("That is not a TikTok link.");

  const apis = [
    `https://api.giftedtech.my.id/api/download/tiktokdlv3?apikey=gifted&url=${text}`,
    `https://apis.davidcyriltech.my.id/download/tiktok?url=${text}`,
    `https://api.agatz.xyz/api/tiktok?url=${text}`,
    `https://api.dreaded.site/api/tiktok?url=${text}`,
    `https://api.ryzendesu.vip/api/downloader/v2/ttdl?url=${text}`
  ];

  try {
    for (const api of apis) {
      try {
        const response = await fetch(api);
        const data = await response.json();
        
        // Checking if the API response is successful
        if (data.status === 200 || data.success) {
          // Extracting the video URL
          const videoUrl = data.data?.nowatermark || data.result || data.tiktok?.data?.data[1]?.url;
          
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
