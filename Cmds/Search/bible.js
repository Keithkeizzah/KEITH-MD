module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        // Check if the book name was provided
        if (!text) {
            return m.reply('Please specify the book, chapter, and verse you want to read. Example: bible john 3:16');
        }

        // Set the reference for the API call
        const reference = encodeURIComponent(text);

        // Fetch element data from the API
        const response = await fetch(`https://bible-api.com/${reference}`);
        const data = await response.json();

        // Check if the data is valid
        if (!data || !data.reference) {
            return m.reply('Invalid reference. Example: bible john 3:16.');
        }

        // Extract element information
        const verses = data.verses.length;
        const contentText = data.text;
        const language = data.translation_name;

        // Create the message
        const message = `𝗞𝗘𝗜𝗧𝗛 𝗠𝗗 𝗕𝗜𝗕𝗟𝗘\n\nWe are reading: ${data.reference}\n\nNumber of verses: ${verses}\n\nNow Read: ${contentText}\n\nTranslation: ${language}`;

        // Send the message
        await client.sendMessage(m.chat, { text: message }, { quoted: m });

    } catch (error) {
        console.error("Error occurred:", error);
        m.reply('An error occurred while fetching the data. Please try again later.');
    }
};
