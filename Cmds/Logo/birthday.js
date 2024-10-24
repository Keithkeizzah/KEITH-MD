const mumaker = require("mumaker");

module.exports = async (context) => {
    const { client, m, text, botname } = context;

    if (!text) {
        return m.reply("Please provide some text.");
    }

    try {
        const lien = "https://en.ephoto360.com/birthday-cake-96.html";
        m.reply("Processing...");

        // Generate the image using the mumaker library
        const img = await mumaker.ephoto(lien, text);

        // Send the generated image
        await client.sendMessage(m.chat, {
            image: { url: img },
            caption: `Downloaded by ${botname}`,
            gifPlayback: false
        }, { quoted: m });

    } catch (error) {
        console.error(error); // Log the error for debugging
        m.reply("An error occurred. Please try again later.");
    }
};
