module.exports = async (context) => {
    const { client, m, dreadedspeed } = context;

    try {
        // Prepare the response text with speed data
        const menuText = `𝖐𝖊𝖎𝖙𝖍 𝖘𝖕𝖊𝖊𝖊𝖉\n${dreadedspeed.toFixed(4)}𝐌\𝐒`;

        // Define the contact message structure with the sender's number
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:KEITH MD\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`;

        // Send the message with the context info (mention the sender and include external ad reply)
        await client.sendMessage(m.chat, {
            text: menuText,
            contextInfo: {
                mentionedJid: [m.sender], // Mention the sender
                externalAdReply: {
                    displayName: "KEITH MD", // Display name for external ad
                    vcard: vcard, // Attach the vCard with sender's number
                    sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47", // Source URL for external ad
                    mediaType: 1, // Media type (image, video, etc.)
                    renderLargerThumbnail: true // Render a larger thumbnail for the external ad
                },
            }
        });
    } catch (error) {
        console.error("Error sending message:", error);
        m.reply('An error occurred while sending the menu.');
    }
};
