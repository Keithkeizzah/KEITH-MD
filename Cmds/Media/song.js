const yts = require("yt-search");
const fetch = require("node-fetch"); // Import 'node-fetch' for API calls

module.exports = async (context) => {
  const { client, m, text, botname, sendReply, sendMediaMessage } = context;

  try {
    // Check if a query is provided
    if (!text) {
      return sendReply(client, m, "Please specify the song you want to download.");
    }

    // Perform a YouTube search with the query
    let search = await yts(text);
    if (!search.all.length) {
      return sendReply(client, m, "No results found for your query.");
    }
    let link = search.all[0].url; // Get the first result's URL

    // Construct the API URL for MP3 audio download
    const apiUrl = `https://keith-api.vercel.app/download/dlmp3?url=${link}`;

    // Fetch audio details from the API
    let response = await fetch(apiUrl);
    let data = await response.json();

    // Check the API response status
    if (data.status && data.result) {
      const audioData = {
        title: data.result.title,
        downloadUrl: data.result.downloadUrl,
        thumbnail: search.all[0].thumbnail,
        format: data.result.format,
        quality: data.result.quality,
      };

      // Send audio details and thumbnail to the user
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

      // Send the audio file to the user
      await client.sendMessage(
        m.chat,
        {
          audio: { url: audioData.downloadUrl },
          mimetype: "audio/mp3",
          caption: `Here is your song: ${audioData.title}`,
        },
        { quoted: m }
      );

      // Optionally send the file as a document for download
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
      // If API returns an error or invalid data
      return sendReply(client, m, "Unable to fetch the song. Please try again later.");
    }
  } catch (error) {
    // Handle any unexpected errors
    return sendReply(client, m, `An error occurred: ${error.message}`);
  }
};
