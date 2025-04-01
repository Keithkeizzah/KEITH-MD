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
        
        // Process top 3 results
        const topResults = data.result.slice(0, 3);
        let message = `🎬 *TikTok Search Results for @${username}* 🎬\n\n`;
        
        topResults.forEach((video, index) => {
            message += `*${index + 1}. ${video.title || 'No title'}*\n`;
            message += `👤 *Author:* @${video.author}\n`;
            message += `👀 *Views:* ${formatViews(video.views)}\n`;
            message += `❤️ *Likes:* ${formatViews(video.likes)}\n`;
            message += `💬 *Comments:* ${formatViews(video.comments)}\n`;
            message += `↗️ *Shares:* ${formatViews(video.shares)}\n`;
            message += `⏱ *Duration:* ${video.duration} seconds\n`;
            message += `🕒 *Posted:* ${formatTime(video.created)}\n`;
            message += `🔗 *URL:* ${video.url}\n\n`;
        });
        
        if (data.result.length > 3) {
            message += `ℹ️ Showing 3 of ${data.result.length} results.`;
        }
        
        // Send the formatted message
        await client.sendMessage(
            m.chat,
            { 
                text: message.trim() 
            },
            { quoted: m }
        );
        
        // Send video covers for top results
        for (const video of topResults) {
            if (video.cover) {
                await client.sendMessage(
                    m.chat,
                    { 
                        image: { url: video.cover },
                        caption: `📌 ${video.title || 'Untitled video'} by @${video.author}`
                    },
                    { quoted: m }
                );
            }
            
            // Send download link (no watermark)
            if (video.videoUrls?.noWatermark) {
                await client.sendMessage(
                    m.chat,
                    { 
                        text: `⬇️ *Download (no watermark):* ${video.videoUrls.noWatermark}`
                    },
                    { quoted: m }
                );
            }
        }
        
    } catch (error) {
        console.error('TikTok search error:', error);
        m.reply("An error occurred while searching TikTok.");
    }
}
