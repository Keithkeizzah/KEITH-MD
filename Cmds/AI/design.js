module.exports = async (context) => {
    const { client, m, text, botname, fetchJson } = context;

    if (!text) return m.reply("Provide a text");

    try {
        const image = await fetchJson(`https://www.samirxpikachu.run.place/ArcticFL?prompt=${text}`);
        

        

        await client.sendMessage(m.chat, {
            image: { url: image},
            caption: `Downloaded by ${botname}`
        }, { quoted: m });

    } catch (e) {
        m.reply("An error occurred. API might be down\n" + e);
    }
};
