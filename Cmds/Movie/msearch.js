const fetch = require("node-fetch");

module.exports = async (context) => {
  const { client, m, text, sendReply } = context;

  try {
    // Check if a search term is provided
    if (!text) {
      return sendReply(client, m, "Please specify the title you want to search for.");
    }

    // Perform a search using the API
    const apiUrl = `https://apis-keith.vercel.app/movie/sinhalasub/search?text=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Handle the search result
    if (!data.status || !data.result.data.length) {
      return sendReply(client, m, "No results found for your query.");
    }

    // Build the indexed list of results
    let resultMessage = "Here are the results for your search:\n\n";
    data.result.data.forEach((item, index) => {
      resultMessage += `${index + 1}. *${item.title}*\nLink: ${item.link}\n\n`;
    });

    // Send the results as a reply
    await sendReply(client, m, resultMessage);
  } catch (error) {
    // Handle any unexpected errors
    return sendReply(client, m, `An error occurred: ${error.message}`);
  }
};
