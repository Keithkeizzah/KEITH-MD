module.exports = async (context) => {

const { client, m, text } = context;
const { download } = require("aptoide-scraper");

try {
if (!text) return m.reply("Provide an app name");

let data = await download(text);

if (data.size.replace(' MB', '') > 250) return m.reply("App is more than 250mb, download yourself");
       

await client.sendMessage(m.chat, { text: `Downloading and uploading ${text}. . .`}, { quoted: m })

await client.sendMessage(
        m.chat,
        { document: { url: data.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data.name + '.apk' },
        { quoted: m }
      )

} catch (error) {

m.reply("Apk download failed\n" + error)

}
};