const yts = require("yt-search");
const fetch = require("node-fetch");

module.exports = async (context) => {
  const { client, m, text, botname, sendReply, sendMediaMessage } = context;

  try {
    // Ensure the user provides a song name
    if (!text) {
      return sendReply(client, m, "Please specify the song you want to download.");
    }

    // Perform a YouTube search
    const search = await yts(text);
    if (!search.all.length) {
      return sendReply(client, m, "No results found for your query.");
    }

    const link = search.all[0].url;

    // Generate the API URL
    const apiUrl = `https://apis-keith.vercel.app/download/dlmp3?url=${link}`;

    // Fetch the audio data from the API
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return sendReply(client, m, "Failed to fetch data from the API. Please try again.");
    }

    const data = await response.json();

    // Check if the API response contains the expected result
    if (data.status && data.result) {
      const { title, downloadUrl, format, quality } = data.result;
      const thumbnail = search.all[0].thumbnail;

      // Send a message with song details and thumbnail
      await sendMediaMessage(client, m, {
        image: { url: thumbnail },
        caption: `
╭═════════════════⊷
║ *Title*: ${title}
║ *Format*: ${format}
║ *Quality*: ${quality}
╰═════════════════⊷
*Powered by ${botname}*`,
      });

      // Send the audio file
      await sendMediaMessage(client, m, {
        audio: { url: downloadUrl },
        mimetype: "audio/mp4",
      });

      // Send the audio file as a document
      await sendMediaMessage(client, m, {
        document: { url: downloadUrl },
        mimetype: "audio/mp3",
        fileName: `${title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp3`,
      });
    } else {
      return sendReply(client, m, "Unable to fetch the song. Please try again later.");
    }
  } catch (error) {
    // Handle unexpected errors
    return sendReply(client, m, `An error occurred: ${error.message}`);
  }
};
