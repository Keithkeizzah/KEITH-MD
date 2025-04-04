
const fetchHentaiVideos = require(__dirname + "/../../lib/hentaivideo"); //

module.exports = async (context) => {
  const { client, m } = context;
  
  try {
    const videos = await fetchHentaiVideos();
    
    if (!videos.length) {
      return client.sendMessage(m.chat, 
        { text: "No videos found at the moment. Please try again later." },
        { quoted: m }
      );
    }

    const selectedVideo = videos[Math.floor(Math.random() * videos.length)];
    
    if (!selectedVideo.media?.video_url) {
      throw new Error('No valid video URL found');
    }

    await client.sendMessage(m.chat, {
      video: { url: selectedVideo.media.video_url },
      caption: `🎬 *${selectedVideo.title}*\n📁 Category: ${selectedVideo.category}\n👀 Views: ${selectedVideo.views_count.toLocaleString()}`,
      mentions: [m.sender]
    }, { quoted: m });

  } catch (error) {
    console.error('Hentai Video Error:', error);
    client.sendMessage(m.chat, 
      { text: `❌ Error fetching content: ${error.message}` },
      { quoted: m }
    );
  }
};
