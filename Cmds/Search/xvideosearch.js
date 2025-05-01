module.exports = async (context) => {
    const { client, m, text, sendReply, sendMediaMessage } = context;
    
    try {
        // Validate input
        if (!text) return sendReply(client, m, '🔍 Please provide a search query for Xvideos');
        
        const fetch = require("node-fetch");
        const query = text.trim();
        
        // Fetch with timeout
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const apiUrl = `https://apis-keith.vercel.app/search/searchxvideos?q=${encodeURIComponent(query)}`;
        
        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeout);

        if (!response.ok) throw new Error(`API responded with ${response.status}`);
        
        const data = await response.json();
        
        // Validate response
        if (!data?.status || !Array.isArray(data.result)) {
            return sendReply(client, m, "❌ Invalid response from Xvideos API");
        }

        if (data.result.length === 0) {
            return sendReply(client, m, `🔎 No videos found for "${query}"`);
        }

        // Helper function to format duration
        const formatDuration = (duration) => {
            if (!duration) return 'N/A';
            // Convert "HH:MM:SS" to more readable format
            const parts = duration.split(':');
            if (parts.length === 3) {
                return `${parts[0]}h ${parts[1]}m ${parts[2]}s`;
            } else if (parts.length === 2) {
                return `${parts[0]}m ${parts[1]}s`;
            }
            return duration;
        };

        // Build results message with all videos
        let message = `🔞 *Xvideos Results for "${query}"* (${data.result.length} videos)\n\n`;
        
        data.result.forEach((video, index) => {
            message += `▫️ *${index + 1}. ${video.title || 'Untitled'}*\n`;
            message += `   ⏱ ${formatDuration(video.duration)}\n`;
            message += `   🔗 ${video.url}\n\n`;
        });

        // Get first available thumbnail or default
        const thumbnail = data.result.find(v => v.thumbnail)?.thumbnail || 
                        'https://i.imgur.com/placeholder.png'; // Default placeholder

        // Send single message with thumbnail and all results
        await sendMediaMessage(client, m, {
            image: { url: thumbnail },
            caption: message.trim()
        }, { quoted: m });

    } catch (error) {
        console.error('Xvideos search error:', error);
        const errorMsg = error.name === 'AbortError' 
            ? '⌛ Search timed out (10s)' 
            : '⚠️ Failed to search Xvideos. Please try again later.';
        sendReply(client, m, errorMsg);
    }
};
