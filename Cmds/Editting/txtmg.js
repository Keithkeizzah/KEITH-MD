/*const textToImage = require('text-to-image');

module.exports = async (context) => {
  const { client, m, text } = context;

  try {
    if (!text) return m.reply("Provide a text.");

    const dataUri = await textToImage.generate(text);

    await client.sendMessage(m.chat, {
      image: { url: dataUri },
      caption: `Here is your image for the text: ${text}`
    }, { quoted: m });

  } catch (e) {
    m.reply('An error occurred while converting text to image\n' + e);
  }
};
*/
