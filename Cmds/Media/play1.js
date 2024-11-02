module.exports = async context => {
  const {
    client,
    m: message,
    text: query
  } = context;
  const ytSearch = require("yt-search");
  const fetch = require("node-fetch");

  try {
    // Check if the query is present
    if (!query || query.length === 0) {
      return message.reply("What song do you want to download?");
    }

    // Join query words into a single string
    const searchQuery = query.join(" ");
    const videoResults = await ytSearch(searchQuery);

    // Check if any videos were found
    if (videoResults && videoResults.videos.length > 0) {
      const video = videoResults.videos[0];  // Take the first video result
      const videoUrl = video.url;
      const chatId = message.chat;
      
      // Fetch video download data
      const response = await fetch(`https://api.ibrahimadams.us.kg/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=cracker`);
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200 && jsonResponse.success) {
        const downloadUrl = jsonResponse.result.download_url;
        
        // Send initial message indicating download is in progress
        await client.sendMessage(chatId, { text: "*Downloading...*" }, { quoted: message });

        // Send video info message with thumbnail and details
        const videoInfoMessage = {
          image: { url: video.thumbnail },
          caption: `*ALPHA-MD VIDEO PLAYER*\n
╭───────────────◆
│ *Title:* ${jsonResponse.result.title}
│ *Duration:* ${video.timestamp}
│ *Artist:* ${video.author.name}
╰────────────────◆`
        };
        await client.sendMessage(chatId, videoInfoMessage, { quoted: message });

        // Send video as a regular video message
        await client.sendMessage(chatId, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: message });

        // Send video as a document
        await client.sendMessage(chatId, { document: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: message });

        // Confirm successful download
        await message.reply(`*${jsonResponse.result.title}*\n\n*Downloaded successfully. Keep using Alpha MD*`);
      } else {
        // Handle cases where the API response indicates failure
        message.reply("Failed to retrieve download URL.");
      }
    } else {
      // No video results found
      message.reply("No video found for the specified query.");
    }
  } catch (error) {
    // Catch and report errors
    message.reply("Download failed\n" + error);
  }
};
