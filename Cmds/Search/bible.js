module.exports = async (context) => {
    const { client, m, text, sendReply, sendMediaMessage } = context;

    try {
        // Check if the book name was provided
        if (!text) {
            return sendReply(client, message, 'Please specify the book, chapter, and verse you want to read. Example: bible john 3:16');
        }

        // Set the reference for the API call
        const reference = encodeURIComponent(text);

        // Fetch element data from the API
        const response = await fetch(`https://bible-api.com/${reference}`);
        const data = await response.json();

        // Check if the data is valid
        if (!data || !data.reference) {
            return sendReply(client, message, 'Invalid reference. Example: bible john 3:16.');
        }

        // Extract element information
        const verses = data.verses.length;
        const contentText = data.text;
        const language = data.translation_name;

        // Create the message
        const message1 = `𝗞𝗘𝗜𝗧𝗛 𝗠𝗗 𝗕𝗜𝗕𝗟𝗘\n\nWe are reading: ${data.reference}\n\nNumber of verses: ${verses}\n\nNow Read: ${contentText}\n\nTranslation: ${language}`;

        // Send the message
        await sendMediaMessage(client, message, message1);

    } catch (error) {
        console.error("Error occurred:", error);
        sendReply(client, message, 'An error occurred while fetching the data. Please try again later.');
    }
};
