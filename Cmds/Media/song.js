const yts = require("yt-search");
const axios = require("axios");

module.exports = async (context) => {
    const { client, m, text, botname, sendReply, sendMediaMessage } = context;

    try {
        if (!text) return await sendReply(client, m, "🎵 Please provide a song name or YouTube link");

        // Search YouTube
        const search = await yts(text);
        if (!search.all.length) return await sendReply(client, m, "❌ No results found");
        
        const video = search.videos[0];
        const videoUrl = video.url;

        // API endpoints with fallback
        const APIs = [
            `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${videoUrl}`,
            `https://apis.davidcyriltech.my.id/youtube/mp3?url=${videoUrl}`
        ];

        let audioUrl;
        for (const api of APIs) {
            try {
                const { data } = await axios.get(api);
                if (data.url || data.result?.downloadUrl) {
                    audioUrl = data.url || data.result.downloadUrl;
                    break;
                }
            } catch (error) {
                console.error(`API ${api} failed:`, error);
                continue;
            }
        }

        if (!audioUrl) throw new Error("All download APIs failed");

        // Send metadata first
        await sendMediaMessage(client, m, {
            image: { url: video.thumbnail },
            caption: `🎧 *${video.title}*\n\n` +
                     `👤 Artist: ${video.author.name}\n` +
                     `⏱ Duration: ${video.timestamp}\n\n` +
                     `_Downloading audio..._`
        });

        // Get audio stream
        const { data: audioStream } = await axios({
            url: audioUrl,
            method: 'GET',
            responseType: 'stream'
        });

        // Send audio file
        await client.sendMessage(m.chat, {
            audio: audioStream,
            mimetype: 'audio/mp3',
            fileName: `${video.title.replace(/[^\w\s]/gi, '')}.mp3`,
            contextInfo: {
                externalAdReply: {
                    title: video.title,
                    body: `Downloaded by ${botname}`,
                    thumbnail: await axios.get(video.thumbnail, { responseType: 'arraybuffer' })
                }
            }
        }, { quoted: m });

    } catch (error) {
        console.error('YT Music Error:', error);
        await sendReply(client, m, `❌ Download failed: ${error.message}`);
    }
};
