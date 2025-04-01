module.exports = async (context) => {
    const { client, m, text } = context;
    
    try {
        if (!text) return m.reply('Please provide a SoundCloud search query');
        
        const fetch = require("node-fetch");
        const query = text.trim();
        
        const apiUrl = `https://apis-keith.vercel.app/search/soundcloud?q=${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (!data.status || !data.result.result.length) {
            return m.reply("No SoundCloud results found. Please try a different search.");
        }
        
        const results = data.result.result;
        let message = `🎧 *SoundCloud Search Results for "${query}"* 🎧\n\n`;
        
        // Format view count
        const formatViews = (views) => {
            if (!views) return 'N/A';
            return views.includes('K') ? views : `${parseInt(views).toLocaleString()}`;
        };
        
        // Process top 5 results
        results.slice(0, 5).forEach((track, index) => {
            message += `*${index + 1}. ${track.title}*\n`;
            message += `👤 *Artist:* ${track.artist}\n`;
            if (track.views) message += `👀 *Views:* ${formatViews(track.views)}\n`;
            if (track.release) message += `📅 *Released:* ${track.release}\n`;
            if (track.timestamp) message += `⏱ *Duration:* ${track.timestamp}\n`;
            message += `🔗 *URL:* ${track.url}\n\n`;
        });
        
        if (results.length > 5) {
            message += `ℹ️ Showing 5 of ${results.length} results.`;
        }
        
        // Send the formatted message
        await client.sendMessage(
            m.chat,
            { 
                text: message.trim() 
            },
            { quoted: m }
        );
        
        // Send thumbnails for tracks that have them
        const tracksWithThumbs = results.filter(track => track.thumb).slice(0, 3);
        for (const track of tracksWithThumbs) {
            await client.sendMessage(
                m.chat,
                { 
                    image: { url: track.thumb },
                    caption: `🎵 ${track.title} - ${track.artist}`
                },
                { quoted: m }
            );
        }
        
    } catch (error) {
        console.error('SoundCloud search error:', error);
        m.reply("An error occurred while searching SoundCloud.");
    }
}
