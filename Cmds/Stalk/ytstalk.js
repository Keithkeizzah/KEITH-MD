module.exports = async (context) => {
    const { client, m, text } = context;
    
    try {
        if (!text) return m.reply('Please provide a YouTube channel username to stalk');
        
        const fetch = require("node-fetch");
        const username = text.trim().replace('@', ''); // Remove @ if included
        
        const response = await fetch(`https://apis-keith.vercel.app/stalker/ytchannel?user=${username}`);
        const data = await response.json();
        
        if (!data.status) {
            return m.reply("Failed to fetch YouTube channel. Maybe the channel doesn't exist?");
        }
        
        const channel = data.result.channel;
        const videos = data.result.videos;
        
        // Format the channel information
        let summary = `
📺 *YouTube Channel Info* 📺

🔍 *Username:* ${channel.username}
🌐 *URL:* ${channel.url}
📝 *Description:* ${channel.description || 'No description'}

📊 *Stats:*
👥 *Subscribers:* ${channel.stats.subscribers.toLocaleString()}
🎥 *Videos:* ${channel.stats.videos.toLocaleString()}

🎬 *Latest Videos:*\n`;
        
        // Add up to 3 latest videos
        videos.slice(0, 3).forEach(video => {
            summary += `\n▶️ *${video.title}*
⏱️ ${video.duration} | 👀 ${video.views.toLocaleString()} views
⏰ ${video.published} | ${video.isShort ? 'SHORT' : 'VIDEO'}
🔗 ${video.url}\n`;
        });
        
        // Send channel avatar with the summary as caption
        await client.sendMessage(
            m.chat, 
            { 
                image: { url: channel.avatar.replace('=s72-c-k-c0x00ffffff-no-rj', '=s800-c-k-c0x00ffffff-no-rj') }, // Higher resolution
                caption: summary 
            }
        );
        
        // Send video thumbnails if available
        if (videos.length > 0) {
            const videoThumbnails = videos.slice(0, 2).map(video => ({
                image: { url: video.thumbnail },
                caption: `▶️ ${video.title}\n👀 ${video.views.toLocaleString()} views | ⏱️ ${video.duration}`
            }));
            
            for (const thumb of videoThumbnails) {
                await client.sendMessage(m.chat, thumb);
            }
        }
        
    } catch (error) {
        console.error('YouTube stalk error:', error);
        m.reply("An error occurred while fetching YouTube channel.");
    }
}
