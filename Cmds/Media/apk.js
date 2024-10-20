module.exports = async (context) => {

const { client, m, text, fetchJson } = context;


try {
if (!text) return m.reply("Provide an app name");

let data = await fetchJson (`https://bk9.fun/search/apk?q=${text}`);
        let dreaded = await fetchJson (`https://bk9.fun/download/apk?id=${data.BK9[0].id}`);
         await client.sendMessage(
              m.chat,
              {
                document: { url: dreaded.BK9.dllink },
                fileName: dreaded.BK9.name,
                mimetype: "application/vnd.android.package-archive"}, { quoted: m });

} catch (error) {

m.reply("Apk download failed\n" + error)

}
};
