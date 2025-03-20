module.exports = async (context) => {
    const { client, m, text, botname, sendReply, sendMediaMessage } = context;

    try {
        // Validate input
        if (!text) return await sendReply(client, m, '🎵 Please provide a TikTok link\nExample: *tiktok https://vm.tiktok.com/...*');
        if (!text.match(/tiktok\.com|vt\.tiktok\.com/)) return await sendReply(client, m, '❌ Invalid TikTok link');

        // Your custom API endpoin
        const apiEndpoint = 'https://apis-keith.vercel.app/download/tiktokdl?url=';

        // Fetch data from your API
        const response = await fetch(apiEndpoint + encodeURIComponent(text));
        const apiResponse = await response.json();

        // Handle API response
        if (!apiResponse.status) throw new Error('API returned an error');

        const { nowm: videoUrl, title, caption, thumbnail } = apiResponse.result;

        if (!videoUrl) throw new Error('No video URL found');

        // Build caption
        const videoCaption = `🎵 *TikTok Downloader* - ${botname}\n\n` +
                             `📌 *Title:* ${title || 'No title'}\n` +
                             `📝 *Caption:* ${caption || 'No caption'}\n` +
                             `_Powered by ${botname}_`;

        // Send video
        await sendMediaMessage(client, m, {
            video: { url: videoUrl },
            caption: videoCaption,
            gifPlayback: false
        });

    } catch (error) {
        console.error('TikTok Download Error:', error);
        await sendReply(client, m, `❌ Failed to download TikTok: ${error.message}`);
    }
};
