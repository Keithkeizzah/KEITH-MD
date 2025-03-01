module.exports = async (context) => {
    const { client, m, text, botname, sendReply, sendMediaMessage } = context;

    try {
        // Validate input
        if (!text) return await sendReply(client, m, '🐦 Please provide a Twitter/X URL\nExample: *twitter https://x.com/...*');
        
        const tweetUrl = text.match(/https?:\/\/(x\.com|twitter\.com)\/\w+\/status\/\d+/i)?.[0];
        if (!tweetUrl) return await sendReply(client, m, '❌ Invalid Twitter/X URL');

        // API endpoints with priority
        const APIs = [
            'https://api.ryzendesu.vip/api/downloader/twitter?url=',
            'https://apis.davidcyriltech.my.id/twitter?url=',
            'https://api.giftedtech.my.id/api/download/twitter?apikey=gifted&url='
        ];

        let videoUrl, metadata;
        for (const api of APIs) {
            try {
                const response = await fetch(api + encodeURIComponent(tweetUrl));
                const data = await response.json();
                
                if (api.includes('ryzendesu') && data?.media?.length) {
                    const bestQuality = data.media.reduce((max, current) => 
                        parseInt(current.quality) > parseInt(max.quality) ? current : max
                    );
                    videoUrl = bestQuality.url;
                    metadata = { description: 'Twitter Video' };
                    break;
                } 
                else if (api.includes('davidcyriltech') && data?.video_hd) {
                    videoUrl = data.video_hd;
                    metadata = {
                        description: data.description,
                        thumbnail: data.thumbnail
                    };
                    break;
                }
                else if (api.includes('giftedtech') && data?.result?.downloads?.length) {
                    videoUrl = data.result.downloads[0].url;
                    metadata = { description: data.result.title };
                    break;
                }
            } catch (error) {
                console.error(`API ${api} failed:`, error);
                continue;
            }
        }

        if (!videoUrl) throw new Error('No video found');

        // Build caption
        const caption = `🐦 *Twitter Video* - ${botname}\n\n` +
                        `${metadata?.description || 'Downloaded video'}\n\n` +
                        `_Powered by ${botname}_`;

        // Send media
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
