const fetch = require('node-fetch'); // Ensure you have the 'node-fetch' package installed

module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        if (!text) {
            return m.reply("give a query");
        }

        const query = encodeURIComponent(text); // Encode the query to handle special characters
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=2024-12-09&sortBy=publishedAt&apiKey=ec5eab56a1bc412bbb6519b2afee0943`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json(); // Parse JSON response

        // Check if articles are available
        if (result.articles && result.articles.length > 0) {
            const articles = result.articles.slice(0, 5); // Limit to 5 articles
            let responseMessage = 'Here are the latest news updates:\n\n';

            articles.forEach((article, index) => {
                responseMessage += `${index + 1}. **${article.title}**\n${article.description}\nRead more: ${article.url}\n\n`;
            });

            await m.reply(responseMessage); // Send the formatted message with news details
        } else {
            await m.reply("No articles found for your query. Please try with different keywords.");
        }

    } catch (e) {
        console.log(e);
        m.reply("An error occurred. Please try again later.");
    }
};
