
const fs = require('fs');
const { exec } = require('child_process');

module.exports = async (context) => {
  const { client, m, text, getRandom } = context;

  try {
    const quoted = m.quoted ? m.quoted : null;
    const mime = quoted?.mimetype || "";

    if (!quoted || !/audio/.test(mime)) {
      return await client.sendMessage(m.chat, { text: `Reply to an *audio file* with *prefix + command* to modify it.` }, { quoted: m });
    }

    const mediaPath = await client.downloadAndSaveMediaMessage(quoted);
    const outputPath = getRandom('.mp3');

    exec(`ffmpeg -i ${mediaPath} -filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75" ${outputPath}`, (error) => {
      fs.unlinkSync(mediaPath);
      if (error) {
        return client.sendMessage(m.chat, { text: error.toString() }, { quoted: m });
      }

      const audioBuffer = fs.readFileSync(outputPath);
      client.sendMessage(m.chat, { audio: audioBuffer, mimetype: 'audio/mpeg' }, { quoted: m });
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    client.sendMessage(m.chat, { text: err.toString() }, { quoted: m });
  }
};
