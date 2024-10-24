module.exports = async (context) => {
    const { client, m, text } = context;

    try {
      
        if (!text) {
            return m.reply('Provide tiktok username');
        }

        
        const response = await fetch(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${query}`);
        const results = await response.json();

        
         if (results.length < 1) {
            return m.reply('Invalid username.');
        }

     
        const  title: item.title;
        const info = item.url;
        const region = item.region;
        const creator = item.creator;
        const id = item.nowm;
      
        const message = `*KEITH-MD TIKTOK SEARCH*\n\ntitle: ${title}\n\nInfo: ${info}\n\nRegion: ${region}\n\nCreator: ${creator}\n\nId: ${id}`;

       
        await client.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { quoted: m });

    } catch (error) {
        console.log("Error occurred:", error);
    }
};
