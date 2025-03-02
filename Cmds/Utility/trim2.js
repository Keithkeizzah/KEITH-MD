
const fs = require('fs');
const { exec } = require('child_process');

module.exports = async (context) => {
  const { client, m, text, getRandom } = context;

  try {
    const quoted = m.quoted ? m.quoted : null;
    const mime = quoted?.mimetype || "";

    if (!quoted) {
      await client.sendMessage(m.chat, { text: `Reply to a *video file* or an *audio file* with the start and end time to trim it.` }, { quoted: m });
      return;
    }

    const [startTime, endTime] = text.split(" ").map(time => time.trim());
    if (!startTime || !endTime) {
      await client.sendMessage(m.chat, { text: `*Example: 1:20 1:50*` }, { quoted: m });
      return;
    }

    if (/video/.test(mime)) {
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
    } else if (/audio/.test(mime)) {
      const media = await client.downloadAndSaveMediaMessage(quoted);
      const outputPath = getRandom(".mp3");

      exec(`ffmpeg -i ${media} -ss ${startTime} -to ${endTime} -c copy ${outputPath}`, (err) => {
        fs.unlinkSync(media);
        if (err) {
          client.sendMessage(m.chat, { text: "*Error!*" }, { quoted: m });
          return;
        }

        const audioBuffer = fs.readFileSync(outputPath);
        client.sendMessage(m.chat, { audio: audioBuffer, mimetype: "audio/mpeg" }, { quoted: m });
        fs.unlinkSync(outputPath);
      });
    } else {
      await client.sendMessage(m.chat, { text: `Reply to a *video* or *audio* file.` }, { quoted: m });
    }
  } catch (error) {
    console.error('Error processing media:', error);
    client.sendMessage(m.chat, { text: 'An error occurred while processing the media.' }, { quoted: m });
  }
};
