module.exports = async (context) => {

const { client, m, text, fetchJson, sendReply, sendMediaMessage } = context;


try {
if (!text) return sendReply(client, m, "Provide an app name");

let data = await fetchJson (`https://bk9.fun/search/apk?q=${text}`);
        let keith = await fetchJson (`https://bk9.fun/download/apk?id=${data.BK9[0].id}`);
         await sendMediaMessage(client, m,
              {
                document: { url: keith.BK9.dllink },
                fileName: keith.BK9.name,
                mimetype: "application/vnd.android.package-archive"}, { quoted: m });

} catch (error) {

sendReply(client, m, "Apk download failed\n" + error)

}
};
