module.exports = async (context) => {
    const { client, m, text } = context;
    
    try {
        if (!text) return m.reply('Please provide a search query for Xvideos');
        
        const fetch = require("node-fetch");
        const query = text.trim();
        
        const apiUrl = `https://apis-keith.vercel.app/search/searchxvideos?q=${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (!data.status || !data.result.length) {
            return m.reply("No Xvideos results found. Please try a different search.");
        }
        
        const results = data.result;
        let message = `🔞 *Xvideos Search Results for "${query}"* 🔞\n\n`;
        
        // Process top 3 results
        results.slice(0, 3).forEach((video, index) => {
            message += `*${index + 1}. ${video.title}*\n`;
            message += `⏱ *Duration:* ${video.duration}\n`;
            message += `🔗 *URL:* ${video.url}\n\n`;
        });
        
        if (results.length > 3) {
            message += `ℹ️ Showing 3 of ${results.length} results.`;
        }
        
        // Send the formatted message
        await client.sendMessage(
            m.chat,
            { 
                text: message.trim() 
            },
            { quoted: m }
        );
        
        // Send thumbnails for videos that have them
        const videosWithThumbs = results.filter(video => video.thumbnail).slice(0, 3);
        for (const video of videosWithThumbs) {
            await client.sendMessage(
                m.chat,
                { 
                    image: { url: video.thumbnail },
                    caption: `🎬 ${video.title}`
                },
                { quoted: m }
            );
        }
        
    } catch (error) {
        console.error('Xvideos search error:', error);
        m.reply("An error occurred while searching Xvideos.");
    }
}
