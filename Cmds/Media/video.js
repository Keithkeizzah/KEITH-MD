//Why do we call it "open source" when it feels more like "open wounds"?

//Because sharing is caring... and crying is healing

const yts = require("yt-search");
const fetch = require("node-fetch"); 

module.exports = async (context) => {
  const { client, m, text, botname, sendReply, sendMediaMessage } = context;

  try {
    
    if (!text) {
      return sendReply(client, m, "Please specify the video you want to download.");
    }

    
    let search = await yts(text);
    if (!search.all.length) {
      return sendReply(client, m, "No results found for your query.");
    }
    let link = search.all[0].url; 

  
    const apiUrl = `https://apis-keith.vercel.app/download/dlmp4?url=${link}`;

    
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.status && data.result) {
      const videoData = {
        title: data.result.title,
        downloadUrl: data.result.downloadUrl,
        thumbnail: search.all[0].thumbnail,
        format: data.result.format,
        quality: data.result.quality,
      };

  
      await sendMediaMessage(client, m, {
        image: { url: videoData.thumbnail },
        caption: `
╭═════════════════⊷
║ *Title*: ${videoData.title}
║ *Format*: ${videoData.format}
║ *Quality*: ${videoData.quality}
╰═════════════════⊷
*Powered by ${botname}*`,
      }, { quoted: m });

      
      await client.sendMessage(
        m.chat,
        {
          video: { url: videoData.downloadUrl },
          mimetype: "video/mp4",
          caption: `Here is your video: ${videoData.title}`,
        },
        { quoted: m }
      );

      return;
    } else {
      
      return sendReply(client, m, "Unable to fetch the video. Please try again later.");
    }
  } catch (error) {
 
    return sendReply(client, m, `An error occurred: ${error.message}`);
  }
};
