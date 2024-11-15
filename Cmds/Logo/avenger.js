const fetch = require('node-fetch');
const mumaker = require('mumaker'); // Assuming you're using mumaker for logo creation
const cheerio = require('cheerio'); // For scraping HTML

module.exports = async (context) => {
    const { client, m, text, botname } = context;

    // Check if the text includes the '|' separator
    if (!text.includes('|')) {
        return m.reply("Example Usage: * .avenger Keith|Tech");
    }

    try {
        // Split the input text into two parts based on '|'
        const [text1, text2] = text.split('|').map(part => part.trim());

        // Ensure both parts are provided
        if (!text1 || !text2) {
            return m.reply("Please provide two arguments separated by '|'. Example: * .avenger Keith|Tech");
        }

        // Construct the URL for generating the logo using the ephoto360 website
        const apiUrl = `https://en.ephoto360.com/create-logo-3d-style-avengers-online-427.html?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;

        // Fetch the page (we assume the page provides an image URL or some other response)
        const response = await fetch(apiUrl);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the HTML response to extract the image URL
        const html = await response.text();
        const imageUrl = parseImageUrlFromHtml(html);

        if (imageUrl) {
            // Fetch the image buffer from the extracted image URL
            const imageBuffer = await fetch(imageUrl).then(res => res.buffer());

            // Send the image as a message
            await client.sendMessage(m.chat, {
                image: imageBuffer,
                caption: `Logo created for ${text1} & ${text2} by ${botname}`,
            }, { quoted: m });
        } else {
            // Optionally, use mumaker if no image found from ephoto360
            const logoData = await mumaker.createLogo({
                text1: text1,
                text2: text2,
                size: 'large', // Adjust size if needed
            });

            if (!logoData || !logoData.imageUrl) {
                throw new Error('No logo returned from mumaker');
            }

            const imageBuffer = await fetch(logoData.imageUrl).then(res => res.buffer());

            await client.sendMessage(m.chat, {
                image: imageBuffer,
                caption: `Logo created for ${text1} & ${text2} by ${botname}`,
            }, { quoted: m });
        }

    } catch (error) {
        console.error(error);
        m.reply(`An error occurred: ${error.message}. Please try again later.`);
    }
};

// Function to extract image URL from HTML using Cheerio
function parseImageUrlFromHtml(html) {
    const $ = cheerio.load(html);
    // Inspect the HTML and find the correct selector for the image
    const imageUrl = $('img').attr('src'); // Example: find the first image
    return imageUrl ? `https:${imageUrl}` : null;
}
