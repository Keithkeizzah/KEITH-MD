
const fs = require('fs');
const { exec } = require('child_process');

module.exports = async (context) => {
  const { client, m, getRandom } = context;

  try {
    const quoted = m.quoted ? m.quoted : null;
    const mime = quoted?.mimetype || "";

    if (!quoted || !/video/.test(mime)) {
      await client.sendMessage(m.chat, { text: `Reply to a *video file* to convert it to audio.` }, { quoted: m });
      return;
    }

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
  } catch (error) {
    console.error('Error processing video:', error);
    client.sendMessage(m.chat, { text: 'An error occurred while processing the video.' }, { quoted: m });
  }
};
