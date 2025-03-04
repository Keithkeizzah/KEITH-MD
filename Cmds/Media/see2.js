const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = async (context) => {
  const { client, m, text } = context;

  try {
    if (!text) return m.reply("Please provide a download link.");

    const downloadResponse = await fetch(`https://apis.davidcyriltech.my.id/movies/download?url=${encodeURIComponent(text)}`);
    const downloadData = await downloadResponse.json();

    if (!downloadData.status || !downloadData.movie || !downloadData.movie.download_links) return m.reply("No download links available for the selected movie.");

    const downloadLink = downloadData.movie.download_links[0].direct_download; // Select the desired quality link

    const response = await axios({
      url: downloadLink,
      method: "GET",
      responseType: "stream"
    });

    const outputPath = path.join(__dirname, `${downloadData.movie.title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp4`);
    const writer = fs.createWriteStream(outputPath);

    response.data.pipe(writer);

    writer.on("finish", async () => {
      await client.sendMessage(m.chat, {
        document: { url: outputPath },
        mimetype: "video/mp4",
        fileName: `${downloadData.movie.title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp4`
      }, { quoted: m });

      fs.unlinkSync(outputPath); // Clean up the downloaded file after sending
    });

    writer.on("error", (err) => {
      m.reply("Download failed\n" + err.message);
    });

  } catch (e) {
    m.reply('An error occurred while processing your request\n' + e);
  }
};
