const { styletext } = require(__dirname + "/../../lib/scrap");

module.exports = async (context) => {
  const { client, m, text } = context;

  if (!text) {
    await client.sendMessage(m.chat, { text: "*Enter a text!*" }, { quoted: m });
    return;
  }

  try {
    let styles = await styletext(text);
    let messageText = `Styles for ${text}\n\n`;

    for (let style of styles) {
      messageText += `🗡️ *${style.name}* : ${style.result}\n\n`;
    }

    await client.sendMessage(m.chat, { text: messageText }, { quoted: m });
  } catch (error) {
    console.error(error);
    await client.sendMessage(m.chat, { text: "*An error occurred while fetching fancy text styles.*" }, { quoted: m });
  }
};
