
const fs = require('fs');
const { exec } = require('child_process');

module.exports = async (context) => {
  const { client, m, text, args, getRandom } = context;

  try {
    const quoted = m.quoted ? m.quoted : null;
    const mime = quoted?.mimetype || "";

    if (!args.join(" ")) {
      await client.sendMessage(m.chat, { text: `*Example: global.prefixz + command 10*` }, { quoted: m });
      return;
    }

    if (!quoted || !/video/.test(mime)) {
      await client.sendMessage(m.chat, { text: `Reply to a *video file* with *${prefix + command}* to adjust volume.` }, { quoted: m });
      return;
    }

    const media = await client.downloadAndSaveMediaMessage(quoted);
    const rname = getRandom(".mp4");

    exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
      fs.unlinkSync(media);
      if (err) {
        client.sendMessage(m.chat, { text: "*Error!*" }, { quoted: m });
        return;
      }

      const modifiedVideo = fs.readFileSync(rname);
      client.sendMessage(
        m.chat,
        { video: modifiedVideo, mimetype: "video/mp4" },
        { quoted: m }
      );
      fs.unlinkSync(rname);
    });
  } catch (error) {
    console.error('Error processing video:', error);
    client.sendMessage(m.chat, { text: 'An error occurred while processing the video.' }, { quoted: m });
  }
};
