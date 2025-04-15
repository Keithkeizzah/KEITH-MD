module.exports = async (context) => {
    const { client, m, text, botname, sendReply, sendMediaMessage } = context;

    try {
        // Validate input
        if (!text) return await sendReply(client, m, '🎵 Please provide a TikTok link\nExample: *tiktok https://vm.tiktok.com/...*');
        if (!text.match(/tiktok\.com|vt\.tiktok\.com/)) return await sendReply(client, m, '❌ Invalid TikTok link');

        // API endpoints with fallbacks
        const APIs = [
            'https://api.agatz.xyz/api/tiktok?url=',
            'https://api.giftedtech.my.id/api/download/tiktokdlv3?apikey=gifted&url=',
            'https://apis.davidcyriltech.my.id/download/tiktok?url='
        ];

        let apiResponse;
        for (const api of APIs) {
            try {
                const response = await fetch(api + encodeURIComponent(text));
                const data = await response.json();
                
                if (api.includes('agatz.xyz') && data?.data?.data?.[0]?.url) {
                    apiResponse = data;
                    break;
                } else if ((api.includes('giftedtech') || api.includes('davidcyriltech')) && data?.result?.url) {
                    apiResponse = data;
                    break;
                }
            } catch (error) {
                console.error(`API ${api} failed:`, error);
                continue;
            }
        }

        if (!apiResponse) throw new Error('All APIs failed');

        // Extract video URL
        const videoUrl = apiResponse.data?.data?.[1]?.url ||  // agatz no watermark
                        apiResponse.result?.url ||           // other APIs
                        apiResponse.data?.data?.[0]?.url;    // fallback

        if (!videoUrl) throw new Error('No video URL found');

        // Build caption
        const meta = apiResponse.data?.data || {};
        const caption = `🎵 *TikTok Downloader* - ${botname}\n\n` +
                        `📌 *Title:* ${meta.title || 'No title'}\n` +
                        `👤 *Author:* ${meta.author?.nickname || 'Unknown'}\n` +
                        `🎶 *Music:* ${meta.music_info?.title || 'No music info'}\n` +
                        `❤️ *Likes:* ${meta.stats?.likes || 'N/A'} | 💬 *Comments:* ${meta.stats?.comment || 'N/A'}\n` +
                        `⏱️ *Duration:* ${meta.duration || 'N/A'}\n` +
                        `📅 *Uploaded:* ${meta.taken_at || 'Unknown date'}\n\n` +
                        `_Powered by ${botname}_`;

        // Send video
        await sendMediaMessage(client, m, {
            video: { url: videoUrl },
            caption: caption,
            gifPlayback: false
        });

    } catch (error) {
        console.error('TikTok Download Error:', error);
        await sendReply(client, m, `❌ Failed to download TikTok: ${error.message}`);
    }
};
