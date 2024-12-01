const fetch = require('node-fetch'); 

module.exports = async (context) => {
    const { client, m, text, botname } = context;

    if (!text) return m.reply("Provide a text");

    try {
        
        const response = await fetch(`https://bk9.fun/maker/ephoto-1?text=BK9&url=https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html=${text}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

       
        const arrayBuffer = await response.arrayBuffer();
        
        
        const buffer = Buffer.from(arrayBuffer);

        
        await client.sendMessage(m.chat, {
            image: buffer,
            caption: `Downloaded by ${botname}`
        }, { quoted: m });

    } catch (e) {
        m.reply("An error occurred. API might be down\n" + e);
    }
};
