const axios = require("axios");

module.exports = async (context) => {
  const { client, m, text } = context;

  // Check if the text (URL) is provided
  if (!text) {
    return m.reply(
      `Hello,\nKeith Tiny URL Shortener Here.\nPlease provide a URL to shorten.\n*Usage:*\n.tiny https://example.com or\n.tiny https://example.com|CustomAlias`
    );
  }

  try {
    let apiUrl = '';
    const urlToShorten = text.trim(); // URL or URL with alias

    // Check if the URL has an alias
    if (urlToShorten.includes('|')) {
      const [url, alias] = urlToShorten.split('|').map(part => part.trim());
      if (!url || !alias) {
        return m.reply("Please provide both URL and alias in the correct format: https://example.com|CustomAlias");
      }
      apiUrl = `https://api.maskser.me/api/linkshort/tinyurlwithalias?link=${encodeURIComponent(url)}&alias=${encodeURIComponent(alias)}`;
    } else {
      apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(urlToShorten)}`;
    }

    // Fetch the shortened URL
    const response = await axios.get(apiUrl);

    // Log the response for debugging purposes
    console.log("API Response:", response.data);

    // Ensure the response has the expected data
    if (response.data && response.data.result) {
      const shortenedUrl = response.data.result;

      // Send the shortened URL as a message
      await client.sendMessage(m.chat, {
        text: `Here is your shortened URL: ${shortenedUrl}`
      }, {
        quoted: m
      });
    } else {
      throw new Error("Unexpected response from URL shortening service.");
    }

  } catch (error) {
    // Log error and notify user
    console.error("Error shortening URL:", error.message);
    m.reply("Error shortening URL. Please check the URL format or try again later." + error);
  }
};
