const yts = require("yt-search");
const fetch = require("node-fetch"); 

module.exports = async (context) => {
  const { client, m, text, botname, sendReply, sendMediaMessage } = context;

  try {
    
    if (!text) {
      return sendReply(client, m, "Please specify the song you want to download.");
    }

    
    let search = await yts(text);
    if (!search.all.length) {
      return sendReply(client, m, "No results found for your query.");
    }
    let link = search.all[0].url; 

    
    const apiUrl = `https://keith-api.vercel.app/download/dlmp3?url=${link}`;

    
    let response = await fetch(apiUrl);
    let data = await response.json();

    
    if (data.status && data.result) {
      const audioData = {
        title: data.result.title,
        downloadUrl: data.result.downloadUrl,
        thumbnail: search.all[0].thumbnail,
        format: data.result.format,
        quality: data.result.quality,
      };

      
      await sendMediaMessage(client, m, {
        image: { url: audioData.thumbnail },
        caption: `
╭═════════════════⊷
║ *Title*: ${audioData.title}
║ *Format*: ${audioData.format}
║ *Quality*: ${audioData.quality}
╰═════════════════⊷
*Powered by ${botname}*`,
      }, { quoted: m });

      
      await client.sendMessage(
        m.chat,
        {
          audio: { url: audioData.downloadUrl },
          mimetype: "audio/mp4",
        },
        { quoted: m }
      );

      
      await client.sendMessage(
        m.chat,
        {
          document: { url: audioData.downloadUrl },
          mimetype: "audio/mp3",
          fileName: `${audioData.title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp3`,
        },
        { quoted: m }
      );

      return;
    } else {
      
      return sendReply(client, m, "Unable to fetch the song. Please try again later.");
    }
  } catch (error) {
    
    return sendReply(client, m, `An error occurred: `);
  }
};
