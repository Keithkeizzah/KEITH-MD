const { exec } = require('child_process');
const speed = require('performance-now');

module.exports = async (context) => {
    const { client, m } = context;

    let thumbnail = 'https://www.guruapi.tech/K.jpg';

    // Prepare the contact message to be sent first
    let fgg = {
        key: { remoteJid: m.chat, participant: `0@s.whatsapp.net` },
        message: {
            contactMessage: {
                displayName: `Keith md`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:KEITH MD\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
            },
        },
    };

    // Start measuring the initial ping time
    let timestamp = speed();
    let latency = (speed() - timestamp).toFixed(4);

    // Send the initial ping message
    await client.sendMessage(m.chat, { text: `*Ping:* *${latency} ms*` });

    // Execute the neofetch command to get system info
    exec('neofetch --stdout', async (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing neofetch:', error);
            await client.sendMessage(m.chat, { text: 'Error executing system information command.' });
            return;
        }

        if (stderr) {
            console.error('stderr:', stderr);
        }

        // Send the output of neofetch as a message
        await client.sendMessage(m.chat, { text: `*System Info:*\n${stdout}` });
    });
};
