const { getRandom } = require(__dirname + "/../../lib/botFunctions");
const fs = require('fs');
const { exec } = require('child_process');

module.exports = async (context) => {
  const { client, m, text, args } = context;

  try {
    const quoted = m.quoted ? m.quoted : null;
    const mime = quoted?.mimetype || "";

    if (!args.length) {
      await client.sendMessage(m.chat, { text: `*Example: prefix + command 10*` }, { quoted: m });
      return;
    }

    if (!quoted || !/audio/.test(mime)) {
      await client.sendMessage(m.chat, { text: `Reply to an *audio file* with *${prefix + command}* to adjust volume.` }, { quoted: m });
      return;
    }

    const mediaPath = await client.downloadAndSaveMediaMessage(quoted);
    const outputPath = getRandom('.mp3');

    exec(`ffmpeg -i ${mediaPath} -filter:a volume=${args[0]} ${outputPath}`, (error) => {
      fs.unlinkSync(mediaPath);
      if (error) {
        client.sendMessage(m.chat, { text: "*Error!*" }, { quoted: m });
        return;
      }

      const modifiedAudio = fs.readFileSync(outputPath);
      client.sendMessage(m.chat, { audio: modifiedAudio, mimetype: "audio/mp4", ptt: true }, { quoted: m });
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    client.sendMessage(m.chat, { text: err.toString() }, { quoted: m });
  }
};
