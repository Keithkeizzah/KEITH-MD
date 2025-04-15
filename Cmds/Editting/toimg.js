const fs = require("fs");
const path = require("path");

module.exports = async (context) => {
  const { client, m, mime, exec, getRandom } = context;

  try {
    if (!m.quoted) return m.reply('Please quote a sticker with the command!');
    if (!/webp/.test(mime)) return m.reply(`Please quote a sticker with the command`);

    let media = await client.downloadAndSaveMediaMessage(m.quoted);
    let outputImage = getRandom('.png');

    exec(`ffmpeg -i ${media} ${outputImage}`, (err) => {
      fs.unlinkSync(media);
      if (err) {
        console.error(err);
        return m.reply('An error occurred while converting the sticker.');
      }
      let buffer = fs.readFileSync(outputImage);
      client.sendMessage(m.chat, { image: buffer, caption: `Converted by keith`}, { quoted: m });
      fs.unlinkSync(outputImage);
    });
  } catch (e) {
    console.error(e);
    m.reply('I am unable to convert animated stickers.');
  }
};
