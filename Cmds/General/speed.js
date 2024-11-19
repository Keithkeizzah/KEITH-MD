const { exec } = require('child_process');

module.exports = async (context) => {
    const { client, m, dreadedspeed } = context;

    try {
        // Reply with speed
        await m.reply(`𝖐𝖊𝖎𝖙𝖍 𝖘𝖕𝖊𝖊𝖉\n${dreadedspeed.toFixed(4)} 𝐌/𝐒`);

        // Send contact message
        const fgg = {
            key: { remoteJid: m.chat, participant: `0@s.whatsapp.net` },
            message: {
                contactMessage: {
                    displayName: `Keith md`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:KEITH MD\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                },
            },
        };

        // Send Ping message with latency
        const latency = dreadedspeed.toFixed(4);
        await client.sendMessage(m.chat, {
            text: `*Ping:* *${latency} ms*`,
            quoted: fgg
        });

    } catch (error) {
        console.error('Error:', error);
    }
};
