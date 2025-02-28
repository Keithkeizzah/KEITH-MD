module.exports = async (context) => {
    const { client, m, text, botname, fetchJson } = context;

    if (!text) {
        return m.reply("Provide a facebook link for the video");
    }

    if (!text.includes("facebook.com")) {
        return m.reply("That is not a facebook link.");
    }

    try {
                let data = await fetchJson(`https://api.dreaded.site/api/facebook?url=${text}`);


        if (!data || data.status !== 200 || !data.facebook || !data.facebook.sdVideo) {
            return m.reply("We are sorry but the API endpoint didn't respond correctly. Try again later.");
        }




        const fbvid = data.facebook.sdVideo;
        const title = data.facebook.title;


        if (!fbvid) {
            return m.reply("Invalid facebook data. Please ensure the video exists.");
        }

        await client.sendMessage(
            m.chat,
            {
                video: { url: fbvid },
                caption: `${title}\n\nDownloaded by ${botname}`,
                gifPlayback: false,
            },
            { quoted: m }
        );
    } catch (e) {
        console.error("Error occurred:", e);
        m.reply("An error occurred. API might be down. Error: " + e.message);
    }
};
