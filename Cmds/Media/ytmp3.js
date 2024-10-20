module.exports = async (context) => {
    const { client, m, text, fetchJson } = context;


if (!text) return m.reply("Where is the YouTube link ?")

	let urls = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/|playlist\?list=)?)([a-zA-Z0-9_-]{11})/gi);
	if (!urls) return m.reply('Is this a YouTube link ?');
	let urlIndex = parseInt(text) - 1;
	if (urlIndex < 0 || urlIndex >= urls.length)
		return m.reply('Invalid URL index');
	await downloadMp3(urls);





async function downloadMp3 (link) {
try {

let data = await fetchJson (`https://widipe.com/download/ytdl?url=${link}`)

await client.sendMessage(m.chat, {
 audio: {url: data.result.mp3},
mimetype: "audio/mp3",
 fileName: `${data.result.title}.mp3`
 
    }, { quoted: m });

await client.sendMessage(m.chat, {
 document: {url: data.result.mp3},
mimetype: "audio/mp3",
 fileName: `${data.result.title}.mp3`
 
    }, { quoted: m });
  } catch (error) {
    console.error('Error fetching the song:', error);
    await m.reply(`Error.`)
  }
}




}
