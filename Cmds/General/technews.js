module.exports = async (context) => {
    const { client, m, text, sendReply, sendMediaMessage } = context;



    const response = await fetch('https://fantox001-scrappy-api.vercel.app/technews/random');
    const data = await response.json();

    const { thumbnail, news } = data;

        await sendMediaMessage(client, m, { image: { url: thumbnail }, caption: news }, { quoted: m });


}

