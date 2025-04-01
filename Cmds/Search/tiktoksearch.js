module.exports = async (context) => {
    const { client, m, text, sendReply, sendMediaMessage } = context;
    
    try {
        // Validate input
        if (!text) return sendReply(client, m, '🔍 Please provide a TikTok username to search');
        
        const fetch = require("node-fetch");
        const username = text.trim().replace('@', '').replace(/\s+/g, ''); // Clean username input

        // Fetch TikTok data with timeout
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10-second timeout
        const apiUrl = `https://apis-keith.vercel.app/search/tiktoksearch?query=${encodeURIComponent(username)}`;
        
        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeout);

        if (!response.ok) throw new Error(`API responded with ${response.status}`);
        
        const data = await response.json();
        
        // Validate response
        if (!data?.status || !Array.isArray(data.result)) {
            return sendReply(client, m, "❌ Invalid response from TikTok API");
        }

        if (data.result.length === 0) {
            return sendReply(client, m, `🔎 No videos found for @${username}`);
        }

        // Helper functions
        const formatDuration = (sec) => {
            if (!sec) return 'N/A';
            const mins = Math.floor(sec / 60);
            const secs = sec % 60;
            return `${mins > 0 ? mins + 'm ' : ''}${secs}s`;
        };

        const formatTimeAgo = (timestamp) => {
            if (!timestamp) return 'Unknown';
            const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000);
            
            const periods = [
                { name: 'year', seconds: 31536000 },
                { name: 'month', seconds: 2592000 },
                { name: 'week', seconds: 604800 },
                { name: 'day', seconds: 86400 },
                { name: 'hour', seconds: 3600 },
                { name: 'minute', seconds: 60 }
            ];

            for (const period of periods) {
                const interval = Math.floor(seconds / period.seconds);
                if (interval >= 1) {
                    return `${interval} ${period.name}${interval === 1 ? '' : 's'} ago`;
                }
            }
            return 'Just now';
        };

        // Build results message with all videos
        let message = `🎬 *TikTok Results for @${username}* (${data.result.length} videos)\n\n`;
        
        data.result.forEach((video, index) => {
            message += `▫️ *${index + 1}. ${video.title || 'Untitled'}*\n`;
            message += `   👤 @${video.author || 'unknown'}\n`;
            message += `   👀 ${(video.views || 0).toLocaleString()} views\n`;
            message += `   ❤️ ${(video.likes || 0).toLocaleString()}  💬 ${(video.comments || 0).toLocaleString()}  ↗️ ${(video.shares || 0).toLocaleString()}\n`;
            message += `   ⏱ ${formatDuration(video.duration)}  🕒 ${formatTimeAgo(video.created)}\n`;
            message += `   🔗 ${video.url}\n\n`;
        });

        // Get best available cover image (first with cover or default)
        const coverImage = data.result.find(v => v.cover)?.cover || 
                         'https://i.imgur.com/3QZQZ9Q.png'; // Default TikTok icon

        // Send results with cover image
        await sendMediaMessage(client, m, {
            image: { url: coverImage },
            caption: message.trim()
        }, { quoted: m });

    } catch (error) {
        console.error('TikTok search error:', error);
        const errorMsg = error.name === 'AbortError' 
            ? '⌛ Search timed out (10s)' 
            : '⚠️ Failed to search TikTok. Please try again later.';
        sendReply(client, m, errorMsg);
    }
};
