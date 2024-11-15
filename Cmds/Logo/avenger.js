const { client, m, text, botname } = context;

if (!text.includes('|')) {
    return m.reply("Example Usage: * .avenger Keith|Tech");
}

try {
    // Split the text by the '|' character
    const [text1, text2] = text.split('|');

    // Check if both parts are provided
    if (!text1 || !text2) {
        return m.reply("Please provide two arguments separated by '|'. Example: * .avenger Keith|Tech");
    }

    // Fetch the data from the API
    const response = await fetch(`https://api.neoxr.eu/api/avenger?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&apikey=mcandy`);

    // Check if the API request was successful
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the image buffer from the response
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Send the image to the chat
    await client.sendMessage(m.chat, {
        image: buffer,
        caption: `Downloaded by ${botname}`
    }, { quoted: m });

} catch (e) {
    // Handle errors gracefully
    m.reply("An error occurred. The API might be down or there was an issue with the request.\n" + e.message);
}
