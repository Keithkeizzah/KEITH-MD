
const fs = require('fs');
const { exec } = require('child_process');

module.exports = async (context) => {
  const { client, m, getRandom } = context;

  try {
    const quoted = m.quoted ? m.quoted : null;
    const mime = quoted?.mimetype || "";

    if (!quoted) {
      await client.sendMessage(m.chat, { text: `Reply to a *video file* to convert it to audio or a *audio file* to convert it to video.` }, { quoted: m });
      return;
    }

    if (/video/.test(mime)) {
      const media = await client.downloadAndSaveMediaMessage(quoted);
      const rname = getRandom(".mp3");

      exec(`ffmpeg -i ${media} -q:a 0 -map a ${rname}`, (err) => {
        fs.unlinkSync(media);
        if (err) {
          client.sendMessage(m.chat, { text: "*Error!*" }, { quoted: m });
          return;
        }

        const audioBuffer = fs.readFileSync(rname);
        client.sendMessage(m.chat, { audio: audioBuffer, mimetype: "audio/mpeg" }, { quoted: m });
        fs.unlinkSync(rname);
      });
    } else if (/audio/.test(mime)) {
      const media = await client.downloadAndSaveMediaMessage(quoted);
      const rname = getRandom(".mp4");

      exec(`ffmpeg -i ${media} -vf "format=yuv420p" -c:v libx264 ${rname}`, (err) => {
        fs.unlinkSync(media);
        if (err) {
          client.sendMessage(m.chat, { text: "*Error!*" }, { quoted: m });
          return;
        }

        const videoBuffer = fs.readFileSync(rname);
        client.sendMessage(m.chat, { video: videoBuffer, mimetype: "video/mp4" }, { quoted: m });
        fs.unlinkSync(rname);
      });
    } else {
      await client.sendMessage(m.chat, { text: `Reply to a *video* or *audio* file.` }, { quoted: m });
    }
  } catch (error) {
    console.error('Error processing media:', error);
    client.sendMessage(m.chat, { text: 'An error occurred while processing the media.' }, { quoted: m });
  }
};
