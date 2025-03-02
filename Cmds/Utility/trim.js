const { getRandom } = require(__dirname + "/../../lib/botFunctions");
const fs = require('fs');
const { exec } = require('child_process');

module.exports = async (context) => {
  const { client, m, text } = context;

  try {
    const quoted = m.quoted ? m.quoted : null;
    const mime = quoted?.mimetype || "";

    if (!quoted || !/video/.test(mime)) {
      await client.sendMessage(m.chat, { text: `Reply to a *video file* with the start and end time to trim it.` }, { quoted: m });
      return;
    }

    const [startTime, endTime] = text.split(" ").map(time => time.trim());
    if (!startTime || !endTime) {
      await client.sendMessage(m.chat, { text: `*Example: 1:20 1:50*` }, { quoted: m });
      return;
    }

    const media = await client.downloadAndSaveMediaMessage(quoted);
    const outputPath = getRandom(".mp4");

    exec(`ffmpeg -i ${media} -ss ${startTime} -to ${endTime} -c copy ${outputPath}`, (err) => {
      fs.unlinkSync(media);
      if (err) {
        client.sendMessage(m.chat, { text: "*Error!*" }, { quoted: m });
        return;
      }

      const videoBuffer = fs.readFileSync(outputPath);
      client.sendMessage(m.chat, { video: videoBuffer, mimetype: "video/mp4" }, { quoted: m });
      fs.unlinkSync(outputPath);
    });
  } catch (error) {
    console.error('Error processing video:', error);
    client.sendMessage(m.chat, { text: 'An error occurred while processing the video.' }, { quoted: m });
  }
};
