const fetch = require("node-fetch");

module.exports = async (context) => {
  const { client, m, text, botname, sendReply, sendMediaMessage } = context;

  try {
    // Check if the user has provided a search query
    if (!text) {
      return sendReply(client, m, "Please specify the title you want to search subtitles for.");
    }

    // Perform a search using the API
    const searchApiUrl = `https://apis-keith.vercel.app/movie/sinhalasub/search?text=${encodeURIComponent(text)}`;
    const searchResponse = await fetch(searchApiUrl);
    const searchData = await searchResponse.json();

    // Handle the search result
    if (!searchData.status || !searchData.result.data.length) {
      return sendReply(client, m, "No subtitles found for your query.");
    }

    // Use the first result for further processing
    const subtitleLink = searchData.result.data[0].link;

    // Fetch subtitle details
    const downloadApiUrl = `https://apis-keith.vercel.app/movie/sinhalasub/movie?url=${encodeURIComponent(subtitleLink)}`;
    const downloadResponse = await fetch(downloadApiUrl);
    const downloadData = await downloadResponse.json();

    if (downloadData.status && downloadData.result.data) {
      const videoData = downloadData.result.data;

      // Send media message with details
      await sendMediaMessage(client, m, {
        image: { url: videoData.image },
        caption: `
╭═════════════════⊷
║ *Title*: ${videoData.title}
║ *Date*: ${videoData.date}
║ *Country*: ${videoData.country}
║ *Rating*: ${videoData.tmdbRate} / 10
║ *Votes*: ${videoData.sinhalasubVote}
║ *Category*: ${videoData.category.join(", ")}
║ *Subtitle Author*: ${videoData.subtitle_author}
╰═════════════════⊷
*Powered by ${botname}*`,
      }, { quoted: m });

      // Send download options as a reply
      let downloadOptions = "Here are the available download options:\n";
      const qualities = ["pixeldrain_dl", "ddl_dl", "meda_dl"];
      
      qualities.forEach((quality) => {
        if (videoData[quality]) {
          videoData[quality].forEach((file) => {
            downloadOptions += `\nQuality: ${file.quality}\nSize: ${file.size}\n[Download](${file.link})\n`;
          });
        }
      });

      await sendReply(client, m, downloadOptions);
    } else {
      return sendReply(client, m, "Unable to fetch subtitle details. Please try again later.");
    }
  } catch (error) {
    // Handle any unexpected errors
    return sendReply(client, m, `An error occurred: ${error.message}`);
  }
};
