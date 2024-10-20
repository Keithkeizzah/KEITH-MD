
module.exports = async (context) => {
    const { client, m, text, fetchJson } = context;

    const yts = require("yt-search");

    try {
        if (!text) return m.reply("What song do you want to download ?")

        let search = await yts(text);
        console.log(search); // Log the search results

        if (!search || !search.all || !search.all[0] || !search.all[0].url) {
            m.reply("Invalid search results");
            return;
        }

        let link = search.all[0].url;

        let data = await fetchJson(`https://widipe.com/download/ytdl?url=${link}`);
        

        if (!data || !data.result || !data.result.mp3 || !data.result.title) {
            m.reply("Invalid data.");
            return;
        }

        await client.sendMessage(m.chat, {
            document: { url: data.result.mp3 },
            mimetype: "audio/mp3",
            fileName: `${data.result.title}.mp3`
        }, { quoted: m });
    } catch (error) {
        m.reply("Download failed\n" + error)
    }
}
