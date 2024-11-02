module.exports = async context => {
  const {
    client,
    m: message,
    text: query,
    fetchJson
  } = context;
  const ytSearch = require("yt-search");

  try {
    if (!query) {
      return message.reply("What song do you want to download?");
    }

    // Perform YouTube search
    let searchResults = await ytSearch(query);
    console.log(searchResults);

    // Validate search results
    if (!searchResults || !searchResults.all || !searchResults.all[0] || !searchResults.all[0].url) {
      message.reply("Invalid search results");
      return;
    }

    // Construct API request URL for downloading
    let videoUrl = searchResults.all[0].url;
    let apiUrl = `https://api.ibrahimadams.us.kg/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=cracker`;
    let downloadData = await fetchJson(apiUrl);

    // Validate download data
    if (!downloadData || !downloadData.result || !downloadData.result.mp3 || !downloadData.result.title) {
      message.reply("Invalid data.");
      return;
    }

    // Send the audio file to the chat
    await client.sendMessage(message.chat, {
      document: {
        url: downloadData.result.mp3
      },
      mimetype: "audio/mp3",
      fileName: downloadData.result.title + ".mp3"
    }, { quoted: message });

  } catch (error) {
    message.reply("Download failed\n" + error);
  }
};
