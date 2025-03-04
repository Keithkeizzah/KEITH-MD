const fetch = require("node-fetch");

module.exports = async (context) => {
  const { client, m, text } = context;

  try {
    if (!text) return m.reply("Please provide a movie name.");

    const searchResponse = await fetch(`https://apis.davidcyriltech.my.id/movies/search?query=${encodeURIComponent(text)}`);
    const searchData = await searchResponse.json();

    if (!searchData.status || !searchData.results || searchData.results.length === 0) return m.reply("No results found for your search.");

    const movie = searchData.results[0];
    const downloadResponse = await fetch(`https://apis.davidcyriltech.my.id/movies/download?url=${encodeURIComponent(movie.link)}`);
    const downloadData = await downloadResponse.json();

    if (!downloadData.status || !downloadData.movie || !downloadData.movie.download_links) return m.reply("No download links available for the selected movie.");

    const downloadLinks = downloadData.movie.download_links.map(link => `Quality: ${link.quality}\nSize: ${link.size}\n[Download Link](${link.direct_download})`).join("\n\n");

    await client.sendMessage(m.chat, {
      image: { url: movie.image },
      caption: `
        *${movie.title} (${movie.year})*
        IMDb: ${movie.imdb}
        
        *Download Links:*
        ${downloadLinks}
      `
    }, { quoted: m });

  } catch (e) {
    m.reply('An error occurred while processing your request\n' + e);
  }
};
