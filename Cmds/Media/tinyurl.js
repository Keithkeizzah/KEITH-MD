const axios = require("axios");

module.exports = async (context) => {
  const { client, m, text } = context;

  // Check if the text (URL) is provided
  if (!text) {
    return m.reply(
      `Hello,\nKeith Tiny URL Shortener Here.\nPlease provide a URL to shorten.\n*Usage:*\n.tiny https://example.com`
    );
  }

  try {
    const urlToShorten = text.trim(); // URL to shorten

    // Ensure the URL is valid
    if (!urlToShorten) {
      return m.reply("Please provide a valid URL to shorten.");
    }

    // Construct the API URL for TinyURL
    const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(urlToShorten)}`;

    // Fetch the shortened URL
    const response = await axios.get(apiUrl);

    // Log the response for debugging purposes
    console.log("API Response:", response.data);

    // Send the shortened URL as a message
    await client.sendMessage(m.chat, {
      text: `Here is your shortened URL: ${response.data}`
    }, {
      quoted: m
    });

  } catch (error) {
    // Log error and notify user
    console.error("Error shortening URL:", error.message);
    m.reply("Error shortening URL. Please check the URL format or try again later.");
  }
};
