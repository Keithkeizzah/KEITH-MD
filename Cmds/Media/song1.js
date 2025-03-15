const yts = require("yt-search");
const fetch = require("node-fetch");
const axios = require("axios"); // Import axios

// Base URLs for the API
const INFO_URL = 'https://cdn59.savetube.su/info';
const DOWNLOAD_URL = 'https://cdn61.savetube.su/download';

// Function to fetch video info
async function getVideoInfo(videoUrl) {
    try {
        const response = await axios.post(INFO_URL, {
            url: videoUrl,
        });

        if (!response.data || !response.data.videoDetails) {
            throw new Error('No video details found.');
        }

        return response.data.videoDetails;
    } catch (error) {
        console.error('Error fetching video info:', error);
        throw error;
    }
}

// Function to generate download links
async function getDownloadLinks(videoUrl, format = 'mp3') {
    try {
        const videoInfo = await getVideoInfo(videoUrl);

        const response = await axios.post(DOWNLOAD_URL, {
            url: videoUrl,
            format: format,
        });

        if (!response.data || !response.data.downloadUrl) {
            throw new Error('No download URL found.');
        }

        return {
            title: videoInfo.title,
            downloadUrl: response.data.downloadUrl,
        };
    } catch (error) {
        console.error('Error generating download links:', error);
        throw error;
    }
}

module.exports = async (context) => {
    const { client, m, text, botname, sendReply, sendMediaMessage } = context;

    try {
        // Check if the user provided a search query
        if (!text) {
            return sendReply(client, m, "Please specify the song you want to download.");
        }

        // Search for the song on YouTube
        let search = await yts(text);
        if (!search.all.length) {
            return sendReply(client, m, "No results found for your query.");
        }

        // Get the first search result's URL
        let link = search.all[0].url;

        // Fetch download link using savetube API
        const audioData = await getDownloadLinks(link, 'mp3');

        // Send the song details as a media message
        await sendMediaMessage(client, m, {
            image: { url: search.all[0].thumbnail },
            caption: `
╭═════════════════⊷
║ *Title*: ${audioData.title}
║ *Format*: MP3
║ *Quality*: 128kbps
╰═════════════════⊷
*Powered by ${botname}*`,
        }, { quoted: m });

        // Send the audio file
        await client.sendMessage(
            m.chat,
            {
                audio: { url: audioData.downloadUrl },
                mimetype: "audio/mp4",
            },
            { quoted: m }
        );

        // Send the audio file as a document
        await client.sendMessage(
            m.chat,
            {
                document: { url: audioData.downloadUrl },
                mimetype: "audio/mp3",
                fileName: `${audioData.title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp3`,
            },
            { quoted: m }
        );

        return;
    } catch (error) {
        console.error('Error:', error);
        return sendReply(client, m, `An error occurred: ${error.message}`);
    }
};
