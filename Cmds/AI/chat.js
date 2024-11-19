const fetch = require('node-fetch');

module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        if (!text) return m.reply("This is ChatGPT. Please provide text.");

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
                return m.reply("An error occurred while processing your request.");
            }
        }

        // Send the result to the user
        if (result) {
            await m.reply(result);
        }

    } catch (error) {
        console.error("Error:", error.message);
        m.reply("An unexpected error occurred. Please try again.");
    }
};
