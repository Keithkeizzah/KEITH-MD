const fetch = require('node-fetch');
const { getContextInfo, sendReply } = require(__dirname + "/../../lib/context"); // Import functions from context.js

module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        if (!text) {
            // Use sendReply instead of m.reply
            await sendReply(client, m, "This is ChatGPT. Please provide text.");
            return;
        }

        const prompt = encodeURIComponent(text);

        // API endpoints
        const guru1 = `https://api.gurusensei.workers.dev/llama?prompt=${prompt}`;
        const guru2 = `https://ultimetron.guruapi.tech/gpt3?prompt=${prompt}`;

        let response, data, result;

        // Try the first API
        try {
            response = await fetch(guru1);
            data = await response.json();
            result = data.response?.response;

            // If no valid response from the first API, log and try the second one
            if (!result) {
                console.log("No valid JSON response from the first API. Trying the second API.");
                throw new Error("No valid response from Guru 1");
            }
        } catch (error) {
            console.error("Error from the first API:", error.message);

            // If the first API fails, try the second API
            try {
                response = await fetch(guru2);
                data = await response.json();
                result = data.completion;

                // If no valid response from the second API, return an error
                if (!result) {
                    throw new Error("No valid response from Guru 2");
                }
            } catch (error) {
                console.error("Error from the second API:", error.message);
                // Use sendReply instead of m.reply
                await sendReply(client, m, "An error occurred while processing your request.");
                return;
            }
        }

        // Send the result to the user using sendReply
        if (result) {
            await sendReply(client, m, result);
        }

    } catch (error) {
        console.error("Error:", error.message);
        // Use sendReply instead of m.reply
        await sendReply(client, m, "An unexpected error occurred. Please try again.");
    }
};
