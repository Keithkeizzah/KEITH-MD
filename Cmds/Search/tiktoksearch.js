module.exports = async (context) => {
    const { client, m, text, sendReply, sendMediaMessage } = context;
    
    try {
        // Validate input
        if (!text) return sendReply(client, m, 'Please provide a TikTok username to search');
        
        const fetch = require("node-fetch");
        const username = text.trim().replace('@', ''); // Normalize username
        
        // Fetch TikTok data
        const apiUrl = `https://apis-keith.vercel.app/search/tiktoksearch?query=${encodeURIComponent(username)}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        
        // Validate response
        if (!data?.status || !Array.isArray(data.result) || data.result.length === 0) {
            return sendReply(client, m, "No TikTok videos found. Please check the username and try again.");
        }

        // Helper functions
        const formatDuration = (sec) => {
            const mins = Math.floor(sec / 60);
            const secs = sec % 60;
            return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
        };

        const formatTimeAgo = (timestamp) => {
            const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000);
            const intervals = {
                year: 31536000,
                month: 2592000,
                week: 604800,
                day: 86400,
                hour: 3600,
                minute: 60
            };
            
            for (const [unit, secondsInUnit] of Object.entries(intervals)) {
                const interval = Math.floor(seconds / secondsInUnit);
                if (interval >= 1) {
                    return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
                }
            }
            return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
        };

        // Build results message
        let message = `🎬 *TikTok Search Results for @${username}*\n`;
        message += `📌 Found ${data.result.length} videos\n\n`;
        
        data.result.slice(0, 10).forEach((video, index) => { // Limit to 10 results
            message += `*${index + 1}. ${video.title || 'Untitled video'}*\n`;
            message += `👤 @${video.author} • 👀 ${(video.views || 0).toLocaleString()} views\n`;
            message += `❤️ ${(video.likes || 0).toLocaleString()} • 💬 ${(video.comments || 0).toLocaleString()} • ↗️ ${(video.shares || 0).toLocaleString()}\n`;
            message += `⏱ ${formatDuration(video.duration)} • 🕒 ${formatTimeAgo(video.created)}\n`;
            message += `🔗 ${video.url}\n\n`;
        });

        if (data.result.length > 10) {
            message += `\nℹ️ Showing 10 of ${data.result.length} results`;
        }

        // Send results with first video's cover
        const firstVideo = data.result[0];
        await sendMediaMessage(client, m, {
            image: firstVideo?.cover ? { url: firstVideo.cover } : undefined,
            caption: message.trim()
        }, { quoted: m });

    } catch (error) {
        console.error('TikTok search error:', error);
        sendReply(client, m, "⚠️ Failed to search TikTok. Please try again later.");
    }
};
