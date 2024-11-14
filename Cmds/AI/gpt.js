const axios = require('axios');

module.exports = async (context) => {
    const { client, m, text, senderId } = context;

    // Check if the user provided any text
    if (!text) return m.reply("What's your question?");

    try {
        // Send the request to the new API with the query (senderId)
        const response = await axios.get(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${encodeURIComponent(text)}`);

        // Check if the response contains valid data
        if (response && response.data) {
            const result = response.data;

            // Ensure the result is not empty or malformed
            if (result && result.reply) {
                m.reply(result.reply);  // Assuming 'reply' is the key holding the result
            } else {
                console.error('No reply found in API response:', result);
                m.reply("Sorry, I couldn't process your request. Please try again.");
            }
        } else {
            console.error('Invalid API response:', response);
            m.reply("Sorry, there was an issue processing your request.");
        }
    } catch (e) {
        // Log detailed error information for debugging
        console.error('Error occurred:', e);

        // Reply with a general error message to the user
        m.reply("An error occurred while processing your request. Please try again later.");
    }
};
