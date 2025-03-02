module.exports = async (context) => {
  const { client, m, author, text, args, botname, fancy } = context;

  const id = text;
  const fullText = args.slice(1).join(" ");

  try {
    if (!id || !text) {
      return await client.sendMessage(
        m.chat,
        {
          text: `\nExample: fancy 10 Keith-Md\n` +
                String.fromCharCode(8206).repeat(4001) +
                fancy.list('KEITH-MD', fancy),
        },
        { quoted: m }
      );
    }

    const selectedStyle = fancy[parseInt(id) - 1];
    if (selectedStyle) {
      return await client.sendMessage(
        m.chat,
        { text: fancy.apply(selectedStyle, fullText) },
        { quoted: m }
      );
    } else {
      return await client.sendMessage(
        m.chat,
        { text: '_Style not found :(_' },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error(error);
    return await client.sendMessage(
      m.chat,
      { text: '_An error occurred :(_' },
      { quoted: m }
    );
  }
};
