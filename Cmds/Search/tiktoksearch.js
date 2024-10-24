module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        if (!text) {
            return m.reply('Provide TikTok username.');
        }

        const query = encodeURIComponent(text); // Encode the username for the URL
        const response = await fetch(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${query}`);
        
        if (!response.ok) {
            return m.reply('Error fetching data from API.');
        }

        const results = await response.json();

        if (results.length < 1) {
            return m.reply('Invalid username.');
        }

        const item = results[0]; // Assuming results is an array and we take the first item
        const title = item.title;
        const info = item.url;
        const region = item.region;
        const creator = item.creator;
        const id = item.nowm;
        const imageUrl = item.imageUrl; // Make sure to extract the correct image URL

        const message = `*KEITH-MD TIKTOK SEARCH*\n\nTitle: ${title}\n\nInfo: ${info}\n\nRegion: ${region}\n\nCreator: ${creator}\n\nId: ${id}`;

        await client.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { quoted: m });
    } catch (error) {
        console.log("Error occurred:", error);
        return m.reply('An error occurred while processing your request.' + error);
    }
};
