let fetchJson = require('fetch-json'); // Assuming fetchJson is available

module.exports = async (context) => {
    const { client, m, text, senderId } = context;

    // Check if the user provided any text
    if (!text) {
        return m.reply("What's your question?");
    }

    try {
        // Send the request to the API with the query (senderId)
        const data = await fetchJson(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${encodeURIComponent(text)}`);

        // Check if the response contains valid data
        if (data && data.reply) {
            // Assuming 'reply' is the key holding the result
            m.reply(data.reply);
        } else {
            console.error('No reply found in API response:', data);
            m.reply("Sorry, I couldn't process your request. Please try again.");
        }
    } catch (e) {
        // Log the error for debugging purposes
        console.error('Error occurred:', e);

        // Reply with a general error message to the user
        m.reply("An error occurred while processing your request. Please try again later.");
    }
};
