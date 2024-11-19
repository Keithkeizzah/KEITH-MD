module.exports = async (context) => {
    const { client, m, dreadedspeed } = context;

    try {
        // Prepare the response text with speed data
        const menuText = `𝖐𝖊𝖎𝖙𝖍 𝖘𝖕𝖊𝖊𝖊𝖉\n${dreadedspeed.toFixed(4)}𝐌\𝐒`;

        // Define the contact message structure (fgg)
        let fgg = {
            key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
            message: {
                contactMessage: {
                    displayName: `KEITH MD`, // Display name
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'KEITH MD'\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, // Sender vCard
                },
            },
        };

        // Send the message with the context info and contact info
        await client.sendMessage(m.chat, {
            text: menuText, // Menu text with speed data
            contextInfo: {
                mentionedJid: [m.sender], // Mention the sender in the message
                externalAdReply: {
                    sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47", // Source URL for external ad
                    mediaType: 1, // Media type (image, video, etc.)
                    renderLargerThumbnail: true // Whether to render a larger thumbnail
                },
                ...fgg, // Spread the contact message into the context info
            }
        });
    } catch (error) {
        console.error("Error sending message:", error);
        m.reply('An error occurred while sending the menu.'); // Error fallback
    }
};
