module.exports = async (context) => {
    const { client, m, text, fetchJson } = context;

const yts = require("yt-search");
try {

if (!text) return m.reply("What song do you want to download ?")

let search = await yts(text);
        let link = search.all[0].url;

        let data = await fetchJson (`https://widipe.com/download/ytdl?url=${link}`)
await client.sendMessage(m.chat, {
  audio: {url: data.result.mp3},
mimetype: "audio/mp3",
 fileName: `${data.result.title}.mp3`}, { quoted: m });


} catch (error) {

m.reply("Download failed\n" + error)

}

}
