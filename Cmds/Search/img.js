const { promisify } = require('util');
const gis = promisify(require('g-i-s'));

module.exports = async (context) => {
    const { client, m, text, botname, sendReply, sendMediaMessage } = context;

    try {
        if (!text) {
            return await sendReply(client, m, `📸 Please provide a search term\nExample: *image sunset*`);
        }

        const results = await gis(text);
        if (!results || results.length === 0) {
            return await sendReply(client, m, '🔍 No images found for your search');
        }

        const maxImages = 5;
        const imageUrls = results
            .slice(0, maxImages)
            .map(result => result.url)
            .filter(url => url);

        if (imageUrls.length === 0) {
            return await sendReply(client, m, '⚠️ Found images but failed to extract valid URLs');
        }

        for (const url of imageUrls) {
            await sendMediaMessage(client, m, {
                image: { url },
                caption: `🌄 Image search result\n🔍 Query: ${text}\n🤖 Powered by ${botname}`
            });
        }

    } catch (error) {
        console.error('Image Search Error:', error);
        await sendReply(client, m, `❌ Error fetching images: ${error.message}`);
    }
};
