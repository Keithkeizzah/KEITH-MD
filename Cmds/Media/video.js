module.exports = async (context) => {
    const { client, m, text, fetchJson } = context;

const yts = require("yt-search");
try {

if (!text) return m.reply("What video do you want to download ?")

let search = await yts(text);
        let link = search.all[0].url;

        let data = await fetchJson (`https://api.dreaded.site/api/ytdl/video?url=${link}`)
await client.sendMessage(m.chat, {
  video: {url: data.result.downloadLink},
mimetype: "video/mp4",
 fileName: `${data.result.title}.mp4`}, { quoted: m });

await client.sendMessage(m.chat, {
 document: {url: data.result.downloadLink},
mimetype: "video/mp4",
 fileName: `${search.all[0].title}.mp4` }, { quoted: m });


} catch (error) {

m.reply("Download failed\n" + error)

}

}
