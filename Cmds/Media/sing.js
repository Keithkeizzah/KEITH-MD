const ytSearch = require("yt-search");
const axios = require("axios");
const fg = require("api-dylux");

async function downloadVideo(url) {
  try {
    if (!url) {
      throw new Error("URL parameter is required.");
    }

    const requestParams = {
      button: 1,
      start: 1,
      end: 1,
      url: url
    };

    const headers = {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
      Origin: "https://loader.to",
      Referer: "https://loader.to",
      "Sec-Ch-Ua": "\"Not-A.Brand\";v=\"99\", \"Chromium\";v=\"124\"",
      "Sec-Ch-Ua-Mobile": '?1',
      "Sec-Ch-Ua-Platform": "\"Android\"",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
    };

    const response = await axios.get("https://ab.cococococ.com/ajax/download.php", {
      params: requestParams,
      headers: headers
    });

    const fileId = response.data.id;

    async function checkDownloadProgress() {
      const progressResponse = await axios.get("https://p.oceansaver.in/ajax/progress.php", {
        params: { id: fileId },
        headers: headers
      });

      const { progress, download_url, text } = progressResponse.data;

      if (text === "Finished") {
        return download_url;
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return checkDownloadProgress();
      }
    }

    return await checkDownloadProgress();
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}

module.exports = async (messageDetails) => {
  const { client, m: message, text: query } = messageDetails;
  const chatId = message.chat;

  try {
    // Check if a query is provided
    if (!query || query.trim().length === 0) {
      return message.reply("What video do you want to download?");
    }

    // Perform a YouTube search based on the query
    const searchResults = await ytSearch(query);

    // If results are found
    if (searchResults && searchResults.videos.length > 0) {
      const firstVideo = searchResults.videos[0];
      const videoUrl = firstVideo.url;

      // Notify the user about the download process
      await message.reply("*Downloading video...*");

      // Download video
      const videoDownloadUrl = await downloadVideo(videoUrl);

      if (videoDownloadUrl) {
        await client.sendMessage(chatId, { text: "*Downloading video...*" }, { quoted: message });
        await client.sendMessage(chatId, {
          video: { url: videoDownloadUrl },
          mimetype: "video/mp4"
        }, { quoted: message });
        await message.reply("Video downloaded successfully.");
      } else {
        await message.reply("Failed to download video.");
      }
    } else {
      await message.reply("No video found for the specified query.");
    }
  } catch (error) {
    message.reply("Download failed\n" + error);
  }
};
