const ytSearch = require('yt-search');
const { downloadAudio } = require("../lib/scrap");  // Import the downloadAudio function from lib/scrap

module.exports = async (context) => {
  const { client: botClient, m: message, text: queryText } = context;

  try {
    // Validate query text
    if (!queryText || queryText.trim().length === 0) {
      return message.reply("What song do you want to download?");
    }

    // Search for videos on YouTube
    const searchResults = await ytSearch(queryText);
    if (!searchResults || searchResults.videos.length === 0) {
      return message.reply("No audio found.");
    }

    const firstVideo = searchResults.videos[0];
    const videoUrl = firstVideo.url;

    // Download audio using the downloadAudio function
    const audioData = await downloadAudio(videoUrl);
    if (!audioData || !audioData.status) {
      return message.reply("Failed to download audio. Please try again later.");
    }

    // Send downloading notification
    const chat = message.chat;
    await botClient.sendMessage(chat.id, { text: "*Downloading...*" }, { quoted: message });

    // Send video info (thumbnail and metadata)
    const videoInfoMessage = {
      image: { url: firstVideo.thumbnail },
      caption: `*KEITH-MD AUDIO PLAYER*\n\n╭───────────────◆\n│ *Title:* ${audioData.title}\n│ *Duration:* ${firstVideo.timestamp}\n│ *Artist:* ${firstVideo.author.name}\n╰────────────────◆`
    };
    await botClient.sendMessage(chat.id, videoInfoMessage, { quoted: message });

    // Send audio file
    await botClient.sendMessage(chat.id, {
      audio: { url: audioData.downloadLink },
      mimetype: "audio/mp3"
    }, { quoted: message });

    // Optionally, send the audio as a downloadable file
    await botClient.sendMessage(chat.id, {
      document: { url: audioData.downloadLink },
      mimetype: "audio/mp3",
      fileName: `${audioData.title}.mp3`
    }, { quoted: message });

    // Final message confirming successful download
    await message.reply(`*${audioData.title}*\n\n*Downloaded successfully. Keep using Keith MD*`);

  } catch (error) {
    message.reply(`Download failed: ${error.message}`);
  }
};
