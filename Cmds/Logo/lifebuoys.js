const fetch = require('node-fetch');

module.exports = async (context) => {
    const { client, m, text, botname } = context;

    // Check if the text includes the '|' separator
    if (!text.includes('|')) {
        return m.reply("Example Usage: * .lifebuoys Keith|Tech");
    }

    try {
        // Split the input text into two parts based on '|'
        const [text1, text2] = text.split('|').map(part => part.trim());

        // Ensure both parts are provided
        if (!text1 || !text2) {
            return m.reply("Please provide two arguments separated by '|'. Example: * .lifebuoys Keith|Tech");
        }

        // Build the API request URL
        const apiUrl = `https://api.neoxr.eu/api/lifebuoys?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&apikey=mcandy`;

        // Fetch the image from the API
        const response = await fetch(apiUrl);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Convert the response to a buffer
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Send the image as a message
        await client.sendMessage(m.chat, {
            image: buffer,
            caption: `Downloaded by ${botname}`,
        }, { quoted: m });

    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        m.reply(`An error occurred: ${error.message}. The API might be down or there was an issue with the request.`);
    }
};

