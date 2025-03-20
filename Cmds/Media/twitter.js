module.exports = async (context) => {
    const { client, m, text, botname, sendReply, sendMediaMessage } = context;

    try {
        // Validate input
        if (!text) return await sendReply(client, m, '🐦 Please provide a Twitter/X URL\nExample: *twitter https://x.com/...*');

        const tweetUrl = text.match(/https?:\/\/(x\.com|twitter\.com)\/\w+\/status\/\d+/i)?.[0];
        if (!tweetUrl) return await sendReply(client, m, '❌ Invalid Twitter/X URL');

        // Your custom API endpoint
        const apiEndpoint = 'https://finalapi2-d20c8c9f4074.herokuapp.com/download/twitter?url=';

        // Fetch data from your API
        const response = await fetch(apiEndpoint + encodeURIComponent(tweetUrl));
        const apiResponse = await response.json();

        // Handle API response
        if (!apiResponse.status) throw new Error('API returned an error');

        const { video_hd: videoUrl, desc: description, thumb: thumbnail } = apiResponse.result;

        if (!videoUrl) throw new Error('No video URL found');

        // Build caption
        const caption = `🐦 *Twitter Video* - ${botname}\n\n` +
                        `📜 *Description:* ${description || 'No description'}\n` +
                        `_Powered by ${botname}_`;

        // Send video
        await sendMediaMessage(client, m, {
            video: { url: videoUrl },
            caption: caption,
            gifPlayback: false
        });

    } catch (error) {
        console.error('Twitter Download Error:', error);
        await sendReply(client, m, `❌ Failed to download Twitter video: ${error.message}`);
    }
};
