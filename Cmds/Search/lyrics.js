module.exports = async (context) => {
    const { client, m, text } = context;
    
    try {
        if (!text) return m.reply('Please provide a song title to search lyrics');
        
        const fetch = require("node-fetch");
        const query = text.trim();
        
        const apiUrl = `https://apis-keith.vercel.app/search/lyrics?query=${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (!data.status || !data.result.length) {
            return m.reply("No lyrics found. Please try a different search term.");
        }
        
        // Format duration from seconds to minutes:seconds
        const formatDuration = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        };
        
        // Process each result
        for (const [index, song] of data.result.slice(0, 3).entries()) {
            const lyricsPreview = song.lyrics.split('\n').slice(0, 4).join('\n');
            
            const songInfo = `
🎵 *${index + 1}. ${song.song}* - ${song.artist}
💿 *Album:* ${song.album || 'Single'}
⏱ *Duration:* ${formatDuration(song.duration)}

📜 *Lyrics Preview:*
${lyricsPreview}...
`.trim();
            
            await client.sendMessage(
                m.chat,
                { 
                    text: songInfo 
                },
                { quoted: m }
            );
            
            // Send full lyrics as a separate message if requested
            if (index === 0) {
                await client.sendMessage(
                    m.chat,
                    {
                        text: `🎤 *Full Lyrics for "${song.song}":*\n\n${song.lyrics}`
                    },
                    { quoted: m }
                );
            }
        }
        
        if (data.result.length > 3) {
            await client.sendMessage(
                m.chat,
                {
                    text: `🔍 Found ${data.result.length} results. Showing top 3.`
                },
                { quoted: m }
            );
        }
        
    } catch (error) {
        console.error('Lyrics search error:', error);
        m.reply("An error occurred while searching for lyrics.");
    }
}
