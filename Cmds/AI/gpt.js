const axios = require('axios');

module.exports = async (context) => {
    const { client, m, text, senderId } = context;

    // Check if the user provided any text
    if (!text) return m.reply("What's your question?");

    try {
        // Send the request to the new API
        const response = await axios.get(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${encodeURIComponent(senderId)}`);

        // Assuming the response has the result you want to send back
        const result = response.data;

        // Reply with the result from the API
        m.reply(result);
    } catch (e) {
        console.error(e);
        m.reply("An error occurred while processing your request.");
    }
};
