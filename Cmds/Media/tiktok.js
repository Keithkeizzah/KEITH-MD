module.exports = async (context) => {
    const { client, m, text, botname, sendReply, sendMediaMessage } = context;

    try {
        // Validate input
        if (!text) return await sendReply(client, m, '🎵 Please provide a TikTok link\nExample: *tiktok https://vm.tiktok.com/...*');
        if (!text.match(/tiktok\.com|vt\.tiktok\.com/)) return await sendReply(client, m, '❌ Invalid TikTok link');

        // API endpoints with priority
        const APIs = [
            'https://api.ryzendesu.vip/api/downloader/v2/ttdl?url=',
            'https://api.dreaded.site/api/tiktok?url=',
            'https://api.agatz.xyz/api/tiktok?url=',
            'https://api.giftedtech.my.id/api/download/tiktokdlv3?apikey=gifted&url=',
            'https://apis.davidcyriltech.my.id/download/tiktok?url='
        ];

        let apiResponse;
        for (const api of APIs) {
            try {
                const response = await fetch(api + encodeURIComponent(text));
                const data = await response.json();
                
                if (api.includes('ryzendesu') && data?.success && data?.data?.video) {
                    apiResponse = data;
                    break;
                } else if (api.includes('dreaded.site') && data?.success && data?.tiktok) {
                    apiResponse = data;
                    break;
                } else if (api.includes('agatz.xyz') && data?.data?.data?.[0]?.url) {
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
        const videoUrl = apiResponse.data?.video?.noWatermark ||          // ryzendesu
                        apiResponse.tiktok?.videoUrl ||                  // dreaded.site
                        apiResponse.data?.data?.[1]?.url ||              // agatz
                        apiResponse.result?.url ||                       // gifted/david
                        apiResponse.data?.data?.[0]?.url;                // fallback

        if (!videoUrl) throw new Error('No video URL found');

        // Format numbers with commas
        const formatNumber = (num) => num ? Number(num).toLocaleString() : 'N/A';

        // Build comprehensive caption
        const buildCaption = () => {
            const data = apiResponse.data || apiResponse.tiktok || {};
            const stats = data.statistics || data.stats || {};
            const author = data.author || {};

            return `🎵 *TikTok Downloader* - ${botname}\n\n` +
                   `📌 ${data.description || data.desc || 'No description'}\n\n` +
                   `👤 *Author:* ${author.nickname || 'Unknown'}\n` +
                   `❤️ *Likes:* ${formatNumber(stats.likeCount || stats.likes)}\n` +
                   `💬 *Comments:* ${formatNumber(stats.commentCount || stats.comment)}\n` +
                   `🔄 *Shares:* ${formatNumber(stats.shareCount || stats.share)}\n\n` +
                   `_Powered by ${botname}_`;
        };

        // Send media with rich caption
        await sendMediaMessage(client, m, {
            video: { url: videoUrl },
            caption: buildCaption(),
            gifPlayback: false
        });

    } catch (error) {
        console.error('TikTok Download Error:', error);
        await sendReply(client, m, `❌ Failed to download TikTok: ${error.message}`);
    }
};
