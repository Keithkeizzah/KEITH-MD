const speed = require("performance-now");

module.exports = async (context) => {
    const { client, m, botname, author, sendReply, sendMediaMessage } = context;

    try {
        // Measure ping
        const timestamp = speed();
        const pingSpeed = speed() - timestamp;

        // Create performance message
        const perfMessage = `⚡ ${botname} Response Speed\n` +
                            `\n📶 *Latency:* ${pingSpeed.toFixed(4)}ms\n` +
                            `\n_Server performance metrics_`;

        // Send initial ping result
        await sendMediaMessage(client, m, {
            text: perfMessage,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            }
        });

        // Show loading animation
        await loadingAnimation(context);

    } catch (error) {
        console.error('Speed Test Error:', error);
        await sendReply(client, m, `❌ Failed to measure performance: ${error.message}`);
    }
};

// Helper functions
async function loadingAnimation({ client, m, sendMediaMessage }) {
    try {
        const symbols = ["◼️", "◻️", "▪️", "▫️", "⬛", "⬜"];
        const { key } = await sendMediaMessage(client, m, {
            text: '⏳ Calculating performance metrics...'
        });

        // Edit animation
        for (const symbol of symbols) {
            await sendMediaMessage(client, m, {
                text: symbol,
                edit: key
            });
            await delay(250);
        }

        // Delete loading message
        await client.sendMessage(m.chat, { delete: key });

    } catch (error) {
        console.error('Loading Animation Error:', error);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
