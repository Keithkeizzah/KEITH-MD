const yts = require("yt-search");
const axios = require("axios");

module.exports = async (context) => {
    const { client, m, text, fetchJson } = context;

    try {
        if (!text) return m.reply("Please specify the song you want to download.");

        // Search for the song on YouTube
        let search = await yts(text);
        let url = search.all[0].url;

        // Fetch the download link from the API
        let data = await fetchJson(`https://api.yanzbotz.live/api/downloader/ytmp3?url=${url}&apiKey=PrincelovesYanz`);

        // Check if the API response has the download link
        if (!data.result || !data.result.downloadLink) {
            return m.reply("Failed to retrieve the download link. Please check the API response.");
        }

        // Send the audio file as a document
        await client.sendMessage(m.chat, {
            document: { url: data.result.downloadLink },
            mimetype: "audio/mp3",
            fileName: `${search.all[0].title}.mp3`
        }, { quoted: m });

    } catch (error) {
        console.error(error);  // Logs error to console for debugging
        m.reply("Download failed. Error: " + error.message);
    }
};
