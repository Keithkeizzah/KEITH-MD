module.exports = async (context) => {
    const { client, m, text } = context;

    // Ensure song name is provided
    if (!text) {
        return m.reply('Please provide a song name to download!');
    }

    // Import necessary modules
    const { downloadAudio } = require("api-dylux");
    const yts = require("youtube-yts");
    
    try {
        // Log the start of the process
        console.log('Starting song command processing...');

        // Search for the song on YouTube
        const yt_search = await yts(text);
        console.log('Search results:', yt_search);

        // If no results found, return a message
        if (!yt_search.videos || yt_search.videos.length === 0) {
            return m.reply('No video results found.');
        }

        // Get the first video from search results
        const video = yt_search.videos[0];
        console.log('Selected video:', video);

        // Download audio using API dylux
        const audioUrl = await downloadAudio(video.url);
        if (!audioUrl) {
            return m.reply('Failed to download the audio.');
        }

        // Prepare the title and thumbnail for the audio message
        const title = video.title;
        const thumbnailUrl = video.thumbnail;

        // Send the audio message to the client
        await client.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            contextInfo: {
                externalAdReply: {
                    title: title,
                    thumbnailUrl: thumbnailUrl,
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

    } catch (error) {
        // Catch and log any errors
        console.error('Error processing song command:', error);
        m.reply('An error occurred while processing your request.');
    }
};
