const fetch = require('node-fetch'); 

module.exports = async (context) => {
    const { client, m, text, botname } = context;

    if (!text) {
        return m.reply("Please provide a text.");
    }

    try {
        // Ensure the URL is properly constructed
        const url = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Read the image from the response
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Send the image to the chat
        await client.sendMessage(m.chat, {
            image: buffer,
            caption: `Downloaded by ${botname}`
        }, { quoted: m });

    } catch (e) {
        // Handle any errors that occur during the fetch
        m.reply(`An error occurred. API might be down\n${e.message}`);
    }
};
