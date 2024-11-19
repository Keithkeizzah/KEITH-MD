module.exports = async (context) => {
    const { client, m, dreadedspeed } = context;

    try {
        // Prepare the response text with speed data
        const menuText = `𝖐𝖊𝖎𝖙𝖍 𝖘𝖕𝖊𝖊𝖉\n${dreadedspeed.toFixed(4)}𝐌\𝐒`;

        // Send message with contextInfo and mention the sender
        await client.sendMessage(m.chat, {
            text: menuText,
            contextInfo: {
                mentionedJid: [m.sender], // Mention the sender
                externalAdReply: {
                    sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("Error sending message:", error);
        m.reply('An error occurred while sending the menu.');
    }
};
