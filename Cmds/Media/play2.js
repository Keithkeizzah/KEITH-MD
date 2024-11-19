module.exports = async (context) => {
    const { client, m, text } = context;

    // Check if the user has provided input (either a title or link)
    if (!text) return m.reply("Please provide a title or YouTube link.");

    // Inform the user that the process is starting
    await m.reply("Please wait...");

    try {
        // Import the necessary modules
        const search = require("yt-search");
        const { youtube } = require("btch-downloader");

        // Search for the video based on the input text (title or link)
        const searchResults = await search(text);
        const firstVideo = searchResults.videos[0];
        
        // If no video is found, inform the user
        if (!firstVideo) return m.reply("No video found.");

        // Check if the video is longer than 1 hour (3600 seconds)
        if (firstVideo.seconds >= 3600) {
            return m.reply("Video is longer than 1 hour, unable to download.");
        }

        // Try to fetch the audio URL from YouTube
        let audioUrl;
        try {
            audioUrl = await youtube(firstVideo.url);
        } catch (error) {
            // Retry fetching audio URL if an error occurs
            audioUrl = await youtube(firstVideo.url);
        }

        // Send the audio message with proper metadata
        await client.sendMessage(m.chat, {
            audio: { url: audioUrl.mp3 },
            mimetype: "audio/mpeg",
            contextInfo: {
                externalAdReply: {
                    title: firstVideo.title,
                    thumbnailUrl: firstVideo.image,
                    sourceUrl: audioUrl.mp3,
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: true
                }
            }
        }, {
            quoted: m
        });

    } catch (error) {
        // If an error occurs, send the error message
        await m.reply("Error: " + error.message);
    }
};
