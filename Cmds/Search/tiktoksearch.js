module.exports = async (context) => {
    const { client, m, text } = context;
    
    try {
        if (!text) return m.reply('Please provide a TikTok username to search');
        
        const fetch = require("node-fetch");
        const username = text.trim().replace('@', ''); // Remove @ if included
        
        const apiUrl = `https://apis-keith.vercel.app/search/tiktoksearch?query=${encodeURIComponent(username)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (!data.status || !data.result.length) {
            return m.reply("No TikTok videos found. Please check the username and try again.");
        }
        
        // Format timestamp to relative time
        const formatTime = (timestamp) => {
            const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000);
            if (seconds < 60) return `${seconds} seconds ago`;
            const minutes = Math.floor(seconds / 60);
            if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
            const days = Math.floor(hours / 24);
            return `${days} day${days === 1 ? '' : 's'} ago`;
        };
        
        // Format view count
        const formatViews = (views) => {
            if (!views) return 'N/A';
            return parseInt(views).toLocaleString();
        };
        
        // Process all results
        let message = `🎬 *TikTok Search Results for @${username}* 🎬\n`;
        message += `📌 *Found ${data.result.length} videos*\n\n`;
        
        data.result.forEach((video, index) => {
            message += `*${index + 1}. ${video.title || 'No title'}*\n`;
            message += `👤 @${video.author} | 👀 ${formatViews(video.views)} views\n`;
            message += `❤️ ${formatViews(video.likes)} | 💬 ${formatViews(video.comments)} | ↗️ ${formatViews(video.shares)}\n`;
            message += `⏱ ${video.duration}s | 🕒 ${formatTime(video.created)}\n`;
            message += `🔗 ${video.url}\n\n`;
        });
        
        // Get first video's cover image
        const firstVideo = data.result[0];
        const coverImage = firstVideo?.cover || null;
        
        // Send single message with cover image and all results as caption
        await client.sendMessage(
            m.chat, 
            { 
                image: coverImage ? { url: coverImage } : undefined,
                caption: message.trim()
            }, 
            { quoted: m }
        );
        
    } catch (error) {
        console.error('TikTok search error:', error);
        m.reply("An error occurred while searching TikTok.");
    }
}
