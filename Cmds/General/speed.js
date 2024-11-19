const { exec } = require('child_process');
const speed = require('performance-now');

module.exports = async (context) => {
    const { client, m } = context;

    // Contact message to send first
    let fgg = {
        key: { remoteJid: m.chat, participant: `0@s.whatsapp.net` },
        message: {
            contactMessage: {
                displayName: `Keith md`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:KEITH MD\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
            },
        },
    };

    // Send the initial ping message
    let pingMsg = await client.sendMessage(m.chat, { text: 'Pinging...' }, { quoted: fgg });

    // Start measuring latency with performance-now
    let timestamp = speed();

    // Execute the neofetch command to get system info
    exec('neofetch --stdout', async (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing neofetch:', error);
            return;
        }

        // Calculate latency by subtracting timestamp from current time
        let latency = (speed() - timestamp).toFixed(4);

        // Send the latency message
        await client.sendMessage(m.chat, { text: `*Ping:* *${latency} ms*\n\nSystem Info:\n${stdout}` });
    });
};
