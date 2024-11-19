const yts = require("yt-search");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = async (context) => {
    const { client, m, text, fetchJson } = context;

    try {
        if (!text) return m.reply("What song do you want to download?");

        let search = await yts(text);
        let link = search.all[0].url;

        
        let data = await fetchJson(`https://api.dreaded.site/api/ytdl/video?url=${link}`);
        
       
        if (!data || data.status !== 200 || !data.result || !data.result.downloadLink) {
            return m.reply("We are sorry but the API endpoint didn't respond correctly. Try again later.");
        }

        let videoUrl = data.result.downloadLink;

        let outputFileName = `${search.all[0].title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp3`;
        let outputPath = path.join(__dirname, outputFileName);

        const response = await axios({
            url: videoUrl,
            method: "GET",
            responseType: "stream"
        });

       
        if (response.status !== 200) {
            return m.reply("We are sorry but the API endpoint didn't respond correctly. Try again later.");
        }

        ffmpeg(response.data)
            .toFormat("mp3")
            .save(outputPath)
            .on("end", async () => {
                await client.sendMessage(
                    m.chat,
                    {
                        document: { url: outputPath },
                        mimetype: "audio/mp3",
                        fileName: outputFileName,
                    },
                    { quoted: m }
                );
                fs.unlinkSync(outputPath);
            })
            .on("error", (err) => {
                m.reply("Download failed\n" + err.message);
            });

    } catch (error) {
        m.reply("Download failed\n" + error.message);
    }
};
