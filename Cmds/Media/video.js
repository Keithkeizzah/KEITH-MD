module.exports = async (_0x2121d6) => {
  const { client: _0x111dc9, m: _0x32b996, text: _0x106ca6 } = _0x2121d6;
  const ytSearch = require("yt-search");
  const fetch = require("node-fetch");

  try {
    // If no text is provided, ask the user for a song name
    if (!_0x106ca6 || _0x106ca6.trim().length === 0) {
      return _0x32b996.reply("Please provide the name of the song you want to download.");
    }

    // Perform a YouTube search for the song
    const searchResult = await ytSearch(_0x106ca6);
    if (searchResult && searchResult.videos.length > 0) {
      const video = searchResult.videos[0];
      const videoUrl = video.url;
      const chatId = _0x32b996.chat;

      // Request the download URL from an API
      const downloadResponse = await fetch(`https://apis.ibrahimadams.us.kg/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=cracker`);
      const downloadData = await downloadResponse.json();

      // If the API returns a successful response, send the download URL
      if (downloadData.status === 200 && downloadData.success) {
        const downloadUrl = downloadData.result.download_url;

        // Notify the user that the download is starting
        await _0x111dc9.sendMessage(chatId, {
          text: "*Downloading...*"
        }, { quoted: _0x32b996 });

        // Send video details (title, artist, duration, and thumbnail)
        const videoDetails = {
          image: {
            url: video.thumbnail
          },
          caption: `*KEITH-MD VIDEO PLAYER*\n\n╭───────────────◆\n│ *Title:* ${downloadData.result.title}\n│ *Duration:* ${video.timestamp}\n│ *Artist:* ${video.author.name}\n╰────────────────◆`
        };
        await _0x111dc9.sendMessage(chatId, videoDetails, { quoted: _0x32b996 });

        // Send the video file
        await _0x111dc9.sendMessage(chatId, {
          video: {
            url: downloadUrl
          },
          mimetype: "video/mp4"
        }, { quoted: _0x32b996 });

        // Send the video as a document (for download)
        await _0x111dc9.sendMessage(chatId, {
          document: {
            url: downloadUrl
          },
          mimetype: "video/mp4"
        }, { quoted: _0x32b996 });

        // Final message confirming the download
        await _0x32b996.reply(`*${downloadData.result.title}*\n\n*Downloaded successfully. Keep using Keith MD*`);
      } else {
        _0x32b996.reply("Failed to retrieve download URL. Please try again.");
      }
    } else {
      _0x32b996.reply("No video found for the specified query. Please check your search term.");
    }
  } catch (error) {
    console.error(error);
    _0x32b996.reply("An error occurred during the download process. Please try again.");
  }
};
