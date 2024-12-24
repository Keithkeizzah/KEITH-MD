const axios = require("axios");
const fg = require("api-dylux");
const ytSearch = require("yt-search");

async function downloadAudio(url) {
  try {
    if (!url) {
      throw new Error("URL parameter is required");
    }
    
    const response = await fg.yta(url);
    const title = response.title;
    const downloadLink = response.dl_url;

    return {
      status: true,
      createdBy: "Keithkeizzah ",
      title: title,
      downloadLink: downloadLink
    };
  } catch (error) {
    console.error("Error fetching audio:", error);
    return null;
  }
}

async function downloadVideo(url, format) {
  try {
    if (!url || !format) {
      throw new Error("URL and format parameters are required.");
    }
    
    const formatValue = parseInt(format.replace('p', ''), 10);
    const requestParams = {
      button: 1,
      start: 1,
      end: 1,
      format: formatValue,
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

    // Poll for progress until download is complete
    async function checkDownloadProgress() {
      const progressResponse = await axios.get("https://p.oceansaver.in/ajax/progress.php", {
        params: { id: fileId },
        headers: headers
      });

      const { progress, download_url, text } = progressResponse.data;

      if (text === "Finished") {
        return download_url;
      } else {
        // Wait for a second before checking progress again
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
      return message.reply("What song or video do you want to download?");
    }

    // Perform a YouTube search based on the query
    const searchResults = await ytSearch(query);

    // If results are found
    if (searchResults && searchResults.videos.length > 0) {
      const firstVideo = searchResults.videos[0];
      const videoUrl = firstVideo.url;

      // Ask the user to choose the video format (e.g., 720p)
      const format = '720p';  // You can dynamically choose the format, for example

      // Use the downloadVideo function to get the download URL
      const downloadUrl = await downloadVideo(videoUrl, format);

      // If the download URL is successfully retrieved
      if (downloadUrl) {
      
        // Send the video file to the user
        await client.sendMessage(chatId, { video: { url: downloadUrl }, 
mimetype: "video/mp4",
    contextInfo: {
            externalAdReply: {
              title: firstVideo.title,
              body: firstVideo.title,
              mediaType: 1,
              sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
              thumbnailUrl: firstVideo.thumbnail,
              renderLargerThumbnail: false,
              showAdAttribution: true
            }
          }
 }, { quoted: message });

        // Send the video file as a document (optional)
        await client.sendMessage(chatId, { document: { url: downloadUrl }, mimetype: "video/mp4",
     contextInfo: {
            externalAdReply: {
              title: firstVideo.title,
              body: firstVideo.title,
              mediaType: 1,
              sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
              thumbnailUrl: firstVideo.thumbnail,
              renderLargerThumbnail: false,
              showAdAttribution: true
            }
          }
 }, { quoted: message });

    
      } else {
        message.reply("Failed to retrieve download URL.");
      }
    } else {
      message.reply("No video found for the specified query.");
    }
  } catch (error) {
    message.reply("Download failed\n" + error);
  }
};
