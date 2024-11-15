module.exports = async (context) => {
  const { client, m, text } = context;
  const axios = require("axios");

  // Check if the text (URL) is provided
  if (!text) {
    return m.reply(
      `Hello,\n Keith Tiny URL Shortener Here.\n Please provide a URL to shorten.\n*Usage:*\n.tiny https://example.com or\n.tiny https://example.com|CustomAlias`
    );
  }

  try {
    let apiUrl = '';
    const urlToShorten = text.trim(); // URL or URL with alias

    // Check if the URL has an alias
    if (urlToShorten.includes('|')) {
      const [url, alias] = urlToShorten.split('|').map(part => part.trim());
      apiUrl = `https://api.maskser.me/api/linkshort/tinyurlwithalias?link=${encodeURIComponent(url)}&alias=${encodeURIComponent(alias)}`;
    } else {
      apiUrl = `https://widipe.com/tinyurl?link=${encodeURIComponent(urlToShorten)}`;
    }

    // Fetch the shortened URL
    const response = await axios.get(apiUrl);
    
    // Ensure the response has the expected data
    if (response.data && response.data.result) {
      const shortenedUrl = response.data.result;

      // Send the shortened URL as a message
      await client.sendMessage(m.chat, {
        text: shortenedUrl
      }, {
        quoted: m
      });
    } else {
      throw new Error("Unexpected response from URL shortening service.");
    }

  } catch (error) {
    // Log error and notify user
    console.error("Error shortening URL:", error.message);
    m.reply("Error shortening URL. Please check the URL format or try again later.");
  }
};
