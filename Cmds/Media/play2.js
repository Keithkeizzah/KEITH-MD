module.exports = async (context) => {
    const { client, m, text, ytmp3 } = context;

    // Define response messages as constants
    const responseMessages = [
        "Enter Title / Link From YouTube!",
        "Please wait...",
        "Video/Audio reply to download",
        "Video is longer than 1 hour!",
        "audio/mpeg",
        "Error: "
    ];

    // If no text is provided, prompt the user to enter a title or link
    if (!text) return m.reply(responseMessages[0]);

    // Inform the user that the process is starting
    await m.reply(responseMessages[1]);
    
    try {
        // Import the necessary modules
        const search = require("yt-search");
        const { youtube } = require("btch-downloader");

        // Search for the video based on the input text (title or link)
        const searchResults = await search(text);
        const firstVideo = searchResults.videos[0];
        
        // If no video is found, inform the user
        if (!firstVideo) return m.reply(responseMessages[2]);

        // Check if the video is longer than 1 hour (3600 seconds)
        if (firstVideo.seconds >= 3600) {
            return m.reply(responseMessages[3]);
        }

        // Try to fetch the audio URL from YouTube
        let audioUrl;
        try {
            audioUrl = await youtube(firstVideo.url);
        } catch (error) {
            // In case of an error, retry fetching the audio URL
            await m.reply(responseMessages[1]);
            audioUrl = await youtube(firstVideo.url);
        }

        // Send the audio message with the proper metadata
        await client.sendMessage(m.chat, {
            audio: { url: audioUrl.mp3 },
            mimetype: responseMessages[4],
            contextInfo: {
                externalAdReply: {
                    title: firstVideo.title,
                    body: "",
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
        await m.reply(`${responseMessages[5]} ${error.message}`);
    }
};
