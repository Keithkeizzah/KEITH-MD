const { exec } = require('child_process');
const speed = require('performance-now');  // Corrected to match proper usage

module.exports = async (context) => {
    const { client, m } = context;  // Simplified the destructuring, 'dreadedspeed' is not used

    let thumbnail = 'https://www.guruapi.tech/K.jpg';
    
    let fgg = {
        key: { remoteJid: m.chat, participant: `0@s.whatsapp.net` },  // Use m.chat directly
        message: {
            contactMessage: {
                displayName: `Keith md`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:KEITH MD\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
            },
        },
    };

    let pingMsg = await client.sendMessage(m.chat, { text: 'Pinging...' }, { quoted: fgg });

    let timestamp = speed();  // Start measuring speed (latency)

    exec('neofetch --stdout', async (error, stdout) => {
        if (error) {
            console.error('Error executing neofetch:', error);
            return;
        }

        let latency = (speed() - timestamp).toFixed(4);  // Calculate latency

        await client.relayMessage(  // Use relayMessage correctly
            m.chat,
            {
                protocolMessage: {
                    key: pingMsg.key,
                    type: 14,  // Edit message
                    editedMessage: {
                        conversation: `*Ping:* *${latency} ms*`,
                    },
                },
            },
            {}
        );
    });
};
