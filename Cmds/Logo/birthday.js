const mumaker = require("mumaker");

module.exports = async (context) => {
    const { client, m, text, botname } = context;

    if (!text) return m.reply("Please provide some text.");

    try {
        const lien = "https://en.ephoto360.com/birthday-cake-96.html";
        const img = await mumaker.ephoto(lien, text);  
        
        m.reply("Processing...");

        await client.sendMessage(m.chat, {
            image: { url: img },
            caption: `Downloaded by ${botname}`,
            gifPlayback: false
        }, { quoted: m });

    } catch (error) {
        console.error(error); // Log the error for debugging
        m.reply("An error occurred. The API might be down or the input is invalid.");
    }
};
