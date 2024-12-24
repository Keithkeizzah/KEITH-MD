const { ChatGpt } = require('chatgpt-scraper');

module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        // Check if there's no input text
        if (!text) return m.reply("This is ChatGPT. Please provide text.");

        // Get response from ChatGPT using the text provided
        const result = await ChatGpt(text);

        // Send the result back to the user
        if (result) {
            await m.reply(result);
        } else {
            await m.reply("No response from ChatGPT. Please try again.");
        }

    } catch (error) {
        console.error("Error:", error.message);
        m.reply("An unexpected error occurred. Please try again.");
    }
};
