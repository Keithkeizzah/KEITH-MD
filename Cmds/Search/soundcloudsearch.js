module.exports = async (context) => {
    const { client, m, text, sendReply, sendMediaMessage } = context;
    
    try {
        // Validate input
        if (!text) return sendReply(client, m, '🎧 Please provide a SoundCloud search query');
        
        const fetch = require("node-fetch");
        const query = text.trim();
        
        // Fetch with timeout
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const apiUrl = `https://apis-keith.vercel.app/search/soundcloud?q=${encodeURIComponent(query)}`;
        
        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeout);

        if (!response.ok) throw new Error(`API responded with ${response.status}`);
        
        const data = await response.json();
        
        // Validate response
        if (!data?.status || !Array.isArray(data.result?.result)) {
            return sendReply(client, m, "❌ Invalid response from SoundCloud API");
        }

        const results = data.result.result;
        if (results.length === 0) {
            return sendReply(client, m, `🔎 No results found for "${query}"`);
        }

        // Helper functions
        const formatViews = (views) => {
            if (!views) return 'N/A';
            if (views.includes('K')) return views;
            return parseInt(views).toLocaleString();
        };

        // Find best thumbnail (first available or default)
        const thumbnail = results.find(track => track.thumb)?.thumb || 
                        'https://i.imgur.com/3QZQZ9Q.png'; // Default music icon

        // Build combined message
        let message = `🎶 *SoundCloud Results for "${query}"*\n`;
        message += `📌 Found ${results.length} tracks\n\n`;
        
        // Show top 5 results
        results.slice(0, 5).forEach((track, index) => {
            message += `▫️ *${index + 1}. ${track.title || 'Untitled Track'}*\n`;
            message += `   👤 ${track.artist || 'Unknown Artist'}\n`;
            message += `   👀 ${formatViews(track.views)}  ⏱ ${track.timestamp || 'N/A'}\n`;
            message += `   📅 ${track.release || 'Release date unknown'}\n`;
            message += `   🔗 ${track.url}\n\n`;
        });

        if (results.length > 5) {
            message += `ℹ️ Showing 5 of ${results.length} results`;
        }

        // Send as single message with thumbnail
        await sendMediaMessage(client, m, {
            image: { url: thumbnail },
            caption: message.trim()
        }, { quoted: m });

    } catch (error) {
        console.error('SoundCloud search error:', error);
        const errorMsg = error.name === 'AbortError' 
            ? '⌛ Search timed out (10s)' 
            : '⚠️ Failed to search SoundCloud. Please try again later.';
        sendReply(client, m, errorMsg);
    }
};
