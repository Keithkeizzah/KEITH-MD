module.exports = async (context) => {
    const { client, m, text, fetchJson } = context;

const yts = require("yt-search");
try {

if (!text) return m.reply("What song do you want to download ?")

let search = await yts(text);
        let link = search.all[0].url;

        let data = await fetchJson (`https://api.yanzbotz.live/api/downloader/ytmp3?url=${url}&apiKey=PrincelovesYanz}`)


await client.sendMessage(m.chat, {
 document: {url: data.result.downloadLink},
mimetype: "audio/mp3",
 fileName: `${search.all[0].title}.mp3` }, { quoted: m });


} catch (error) {

m.reply("Download failed\n" + error)

}

}
