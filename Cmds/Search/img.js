var gis = require('g-i-s');

module.exports = async (context) => {
    const { client, m, text, botname } = context;

    if (!text) return m.reply("Provide a text");

    try {
        // Use the 'text' as the search term for images
        gis(text, async (error, results) => {
            if (error) {
                return m.reply("An error occurred while searching for images.\n" + error);
            }

            // Check if results are found
            if (results.length === 0) {
                return m.reply("No images found.");
            }

            // Limit the number of images to send (e.g., 5)
            const numberOfImages = Math.min(results.length, 5);
            const imageUrls = results.slice(0, numberOfImages).map(result => result.url);

            // Send the images
            const messages = imageUrls.map(url => ({
                image: { url },
                caption: `Downloaded by ${botname}`
            }));

            for (const message of messages) {
                await client.sendMessage(m.chat, message, { quoted: m });
            }
        });
    } catch (e) {
        m.reply("An error occurred.\n" + e);
    }
};
