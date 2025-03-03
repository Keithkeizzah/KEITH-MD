const { getRandom } = require(__dirname + "/../../lib/botFunctions");
const fs = require('fs');
const { exec } = require('child_process');
const axios = require('axios');

module.exports = async (context) => {
  const { client, m, text } = context;

  try {
    const quoted = m.quoted ? m.quoted : null;
    const mime = quoted?.mimetype || "";

    if (!quoted || !/video/.test(mime)) {
      await client.sendMessage(m.chat, { text: `Reply to a *video file* with the audio URL to add to the video.` }, { quoted: m });
      return;
    }

    if (!text) {
      await client.sendMessage(m.chat, { text: `Provide an audio URL.` }, { quoted: m });
      return;
    }

    const audioUrl = text.trim();
    const media = await client.downloadAndSaveMediaMessage(quoted);
    const audioPath = getRandom(".mp3");
    const outputPath = getRandom(".mp4");

    // Download the audio from the URL
    const response = await axios({
      method: 'get',
      url: audioUrl,
      responseType: 'arraybuffer'
    });

    fs.writeFileSync(audioPath, response.data);

    // Merge the downloaded audio with the quoted video
    exec(`ffmpeg -i ${media} -i ${audioPath} -c:v copy -c:a aac -strict experimental ${outputPath}`, (err) => {
      fs.unlinkSync(media);
      fs.unlinkSync(audioPath);
      if (err) {
        client.sendMessage(m.chat, { text: "*Error!*" }, { quoted: m });
        return;
      }

      const videoBuffer = fs.readFileSync(outputPath);
      client.sendMessage(m.chat, { video: videoBuffer, mimetype: "video/mp4" }, { quoted: m });
      fs.unlinkSync(outputPath);
    });
  } catch (error) {
    console.error('Error processing media:', error);
    client.sendMessage(m.chat, { text: 'An error occurred while processing the media.' }, { quoted: m });
  }
};
