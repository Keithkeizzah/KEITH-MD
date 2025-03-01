const getFBInfo = require("@xaviabot/fb-downloader");

module.exports = async (context) => {
    const { client, m, text, botname, sendReply, sendMediaMessage } = context;

    try {
        // Validate input
        if (!text) return await sendReply(client, m, '📘 Please provide a Facebook URL\nExample: *fb https://fb.watch/...*');
        
        const fbUrl = text.match(/(https?:\/\/)?(www\.)?(facebook\.com|fb\.watch)\/[^\s]+/i)?.[0];
        if (!fbUrl) return await sendReply(client, m, '❌ Invalid Facebook URL');

        // Fetch Facebook video info
        const result = await getFBInfo(fbUrl);
        if (!result?.hd) throw new Error('No downloadable video found');

        // Build caption
        const caption = `📹 *Facebook Video* - ${botname}\n\n` +
                        `📌 *Title:* ${result.title || 'Untitled'}\n` +
                        `🔗 *Original URL:* ${result.url}\n\n` +
                        `_Powered by Facebook Downloader_`;

        // Send HD video
        await sendMediaMessage(client, m, {
            video: { url: result.hd },
            caption: caption,
            gifPlayback: false
        });

    } catch (error) {
        console.error('Facebook Download Error:', error);
        await sendReply(client, m, `❌ Failed to download Facebook video: ${error.message}`);
    }
};
