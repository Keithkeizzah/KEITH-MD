const fetch = require('node-fetch'); // Ensure you have the 'node-fetch' package installed

module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        if (!text) {
            return m.reply("Ask any news update and Alpha bot will send you.");
        }

        const query = encodeURIComponent(text); // Encode the query to handle special characters
        const response = await fetch(`https://www.samirxpikachu.run.place/ppx?query=${query}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json(); // Parse JSON response
        await m.reply(result.result);

    } catch (e) {
        console.log(e);
        m.reply("An error occurred. Please try again later.");
    }
};
