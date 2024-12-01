const axios = require('axios');

module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        // Check if the query text is provided
        if (!text) {
            return m.reply('Please provide a search query.');
        }

        // Encode the search query to be used in the URL
        const reference = encodeURIComponent(text);

        // Fetch data from the Spotify API
        const response = await axios.get(`https://spotifyapi.caliphdev.com/api/search/tracks?q=${reference}`);
        
        // Log the response to inspect its structure (can be removed after debugging)
        console.log(response.data);

        const data = response.data;  // Assuming response contains a 'tracks' property
        
        // Check if the 'tracks' property exists and has results
        if (!data || !data.tracks || data.tracks.length === 0) {
            return m.reply('No tracks found for your query.');
        }

        // Prepare a message for the first 10 tracks
        let captions = '';

        // Loop through the tracks and format the message
        for (let i = 0; i < Math.min(data.tracks.length, 10); i++) {
            const track = data.tracks[i];
            
            const title = track.title;
            const artist = track.artist;
            const album = track.album;
            const url = track.url;
            const id = track.id;
            const date = track.release_date;
            const duration = track.duration;
            const thumbnail = track.thumbnail;
            const preview = track.preview_mp3;

            captions += `*────────────────────*\n` +
                        `*${i + 1}.* Title: ${title}\n` +
                        `*Artist:* ${artist}\n` +
                        `*Album:* ${album}\n` +
                        `*Release Date:* ${date}\n` +
                        `*Duration:* ${duration}s\n` +
                        `*Track URL:* ${url}\n` +
                        `*Track ID:* ${id}\n` +
                        `*Preview MP3:* ${preview}\n` +
                        `*Thumbnail:* ${thumbnail}\n` +
                        `*────────────────────*\n\n`;
        }

        captions += "*POWERED BY KEITH MD*";

        // Send the message to the user
        await client.sendMessage(m.chat, {
            image: { url: data.tracks[0].thumbnail },  // Thumbnail of the first track
            caption: captions
        }, { quoted: m });

    } catch (error) {
        console.error("Error occurred:", error);
        m.reply('An error occurred while fetching the data. Please try again later.');
    }
};
