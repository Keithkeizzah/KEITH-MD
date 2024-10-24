const yts = require("yt-search");

module.exports = async (context) => {
  const { client, m, text, dest } = context;

  try {
    // Check if the text is provided
    if (!text) {
      return m.reply("Provide any media query..");
    }

    // Perform the search
    const info = await yts(text);
    const results = info.videos;

    // Check if there are results
    if (!results || results.length === 0) {
      return m.reply("No results found.");
    }

    // Build the captions for the message
    let captions = "";
    for (let i = 0; i < Math.min(results.length, 10); i++) {
      captions += `----------------\nTitle: ${results[i].title}\nTime: ${results[i].timestamp}\nUrl: ${results[i].url}\n`;
    }
    captions += "\n======\n*powered KEITH-MD*";

    // Send the message
    await client.sendMessage(dest, {
      image: { url: results[0].thumbnail },
      caption: captions
    }, { quoted: m });
  } catch (error) {
    // Improved error handling
    console.error("Error occurred:", error); // Log the error for debugging
    m.reply("Failed: " + error.message);
  }
};
