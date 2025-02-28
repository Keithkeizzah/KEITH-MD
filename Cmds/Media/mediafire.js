module.exports = async (context) => {
  const { client, m, text, fetchJson } = context;

  try {
    if (!text) return m.reply("Provide mediafire link. ");

    
    const mediafireUrl = `https://api.dreaded.site/api/mediafiredl?url=${text}`;
    let data = await fetchJson(mediafireUrl);

    if (data.status !== 200 || !data.result || !data.result.link) {
      return m.reply("Unable to retrieve  download link.");
    }

    
    await client.sendMessage(
      m.chat,
      {
        document: { url: data.result.link },
        fileName: data.result.filename,
        mimetype: data.result.mimetype
      },
      { quoted: m }
    );
  } catch (error) {
    m.reply("download failed\n" + error);
  }
};
