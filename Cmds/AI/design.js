module.exports = async (context) => {
    const { client, m, text, botname } = context;

    if (!text) return m.reply("Provide a text");

    try {
        const response = await fetch(`https://www.samirxpikachu.run.place/ArcticFL?prompt=${text}`);
        const data = await response.json();

        const imageUrl = data.data.data.SD;

        await client.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: `Downloaded by ${botname}`,
            gifPlayback: false
        }, { quoted: m });

    } catch (e) {
        m.reply("An error occurred. API might be down\n" + e);
    }
};
