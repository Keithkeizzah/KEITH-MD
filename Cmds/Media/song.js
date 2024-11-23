const ytSearch = require('yt-search');
  const { downloadAudio } = require("../lib/scrap");  // Import the downloadAudio function from lib/scrap
  const fs = require('fs');

module.exports = async (context) => {
  const { client: botClient, m: message, text: queryText } = context;

  

  try {
    // Ensure that the queryText is not empty
    if (!queryText || queryText.trim().length === 0) {
      return message.reply("What song do you want to download?");
    }

    // Search for videos on YouTube based on the query text
    const searchResults = await ytSearch(queryText);
    if (searchResults && searchResults.videos.length > 0) {
      const firstVideo = searchResults.videos[0];
      const videoUrl = firstVideo.url;

      const chat = message.chat;

      // Use the downloadAudio function from lib/scrap
      const audioData = await downloadAudio(videoUrl);

      if (audioData && audioData.status) {
        // Send message indicating that the download has started
        await botClient.sendMessage(chat.id, { text: "*Downloading...*" }, { quoted: message });

        // Send thumbnail and video info
        const videoInfoMessage = {
          image: { url: firstVideo.thumbnail },
          caption: `*KEITH-MD AUDIO PLAYER*\n\n╭───────────────◆\n│ *Title:* ${audioData.title}\n│ *Duration:* ${firstVideo.timestamp}\n│ *Artist:* ${firstVideo.author.name}\n╰────────────────◆`
        };
        await botClient.sendMessage(chat.id, videoInfoMessage, { quoted: message });

        // Send the audio file
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

        // Final message to the user after download is complete
        await message.reply(`*${audioData.title}*\n\n*Downloaded successfully. Keep using Keith MD*`);
      } else {
        message.reply("Failed to download audio. Please try again later.");
      }
    } else {
      message.reply("No audio found.");
    }
  } catch (error) {
    message.reply(`Download failed\n${error}`);
  }
};
