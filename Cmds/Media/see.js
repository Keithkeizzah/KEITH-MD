const yts = require("yt-search");
const { ytmp3, ytmp4 } = require(__dirname + "/../../lib/ytdl");// Import the scraper functions

module.exports = async (context) => {
    const { client, m, text, botname, sendReply, sendMediaMessage } = context;

    try {
        // Check if the user provided a search query
        if (!text) {
            return sendReply(client, m, "Please specify the song or video you want to download.");
        }

        // Search for the song/video on YouTube
        let search = await yts(text);
        if (!search.all.length) {
            return sendReply(client, m, "No results found for your query.");
        }

        // Get the first search result's URL
        let link = search.all[0].url;

        // Fetch download links using the scraper
        const audioData = await ytmp3(link); // Fetch MP3 download link
        const videoData = await ytmp4(link); // Fetch MP4 download links

        // Send the song/video details as a media message
        await sendMediaMessage(client, m, {
            image: { url: search.all[0].thumbnail },
            caption: `
╭═════════════════⊷
║ *Title*: ${search.all[0].title}
║ *Format*: MP3 / MP4
║ *Quality*: 128kbps (MP3) / 240p-1080p (MP4)
╰═════════════════⊷
*Powered by ${botname}*`,
        }, { quoted: m });

        // Send the audio file (MP3)
        if (audioData.dl_link) {
            await client.sendMessage(
                m.chat,
                {
                    audio: { url: audioData.dl_link },
                    mimetype: "audio/mp4",
                },
                { quoted: m }
            );

            // Send the audio file as a document
            await client.sendMessage(
                m.chat,
                {
                    document: { url: audioData.dl_link },
                    mimetype: "audio/mp3",
                    fileName: `${search.all[0].title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp3`,
                },
                { quoted: m }
            );
        }

        // Send the video files (MP4)
        if (videoData.dl) {
            await client.sendMessage(
                m.chat,
                {
                    video: { url: videoData.dl },
                    caption: "240p Video",
                },
                { quoted: m }
            );
        }
        if (videoData.dl1) {
            await client.sendMessage(
                m.chat,
                {
                    video: { url: videoData.dl1 },
                    caption: "360p Video",
                },
                { quoted: m }
            );
        }
        if (videoData.dl2) {
            await client.sendMessage(
                m.chat,
                {
                    video: { url: videoData.dl2 },
                    caption: "480p Video",
                },
                { quoted: m }
            );
        }
        if (videoData.dl3) {
            await client.sendMessage(
                m.chat,
                {
                    video: { url: videoData.dl3 },
                    caption: "720p Video",
                },
                { quoted: m }
            );
        }
        if (videoData.dl4) {
            await client.sendMessage(
                m.chat,
                {
                    video: { url: videoData.dl4 },
                    caption: "1080p Video",
                },
                { quoted: m }
            );
        }

        return;
    } catch (error) {
        console.error('Error:', error);
        return sendReply(client, m, `An error occurred: ${error.message}`);
    }
};
