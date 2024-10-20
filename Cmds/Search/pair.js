const fetch = require('node-fetch'); // Ensure you have node-fetch imported

module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        if (!text) {
            return m.reply('Please provide a valid phone number.');
        }

        // Encode the phone number to handle special characters
        const encodedNumber = encodeURIComponent(text);

        // Fetch phone number data from the API
        const response = await fetch(`https://keith-sessions-pi5z.onrender.com/code?number=${encodedNumber}`);

        // Check if the response is okay (status code 200-299)
        if (!response.ok) {
            return m.reply('Error fetching data from the API. Please try again later.');
        }

        const data = await response.json();

        // Check if the data is valid
        if (!data || !data.code) {
            return m.reply('Invalid phone number.');
        }

        const pairingCode = data.code;

        // Create the message
        const message = `Your pairing code is: ${pairingCode}`;
        return m.reply(message);

    } catch (error) {
        console.log("Error occurred:", error);
        return m.reply('An unexpected error occurred. Please try again later.');
    }
};
