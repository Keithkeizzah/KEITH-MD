const fetch = require('node-fetch');

module.exports = async (context) => {
  const { client, m, text, fetchJson, sendReply, sendMediaMessage } = context;

  const apiUrl = `https://api.dreaded.site/api/lyrics?title=${encodeURIComponent(text)}`;

  try {
    if (!text) return sendReply(client, m, "Provide a song name!");

    const data = await fetchJson(apiUrl);

    if (!data.success || !data.result || !data.result.lyrics) {
      return sendReply(client, m, `Sorry, I couldn't find any lyrics for "${text}".`);
    }

    const { title, artist, link, thumb, lyrics } = data.result;

    const imageUrl = thumb || "https://i.imgur.com/Cgte666.jpeg";

    const imageBuffer = await fetch(imageUrl)
      .then(res => res.buffer())
      .catch(err => {
        console.error('Error fetching image:', err);
        return null;
      });

    if (!imageBuffer) {
      return sendReply(client, m, "An error occurred while fetching the image.");
    }

    const caption = `*Title*: ${title}\n*Artist*: ${artist}\n\n${lyrics}`;

    await sendMediaMessage(client, m, 
      {
        image: imageBuffer,
        caption: caption
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    sendReply(client, m, `An error occurred while fetching the lyrics for "${text}".`);
  }
}
