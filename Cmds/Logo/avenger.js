const fetch = require('node-fetch');

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

        // Construct the URL for generating the logo (assuming the ephoto360 website can accept parameters directly in the URL)
        const apiUrl = `https://en.ephoto360.com/create-logo-3d-style-avengers-online-427.html?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;

        // Fetch the page (we assume the page provides an image URL or some other response)
        const response = await fetch(apiUrl);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Assuming that ephoto360 returns an image URL or some data, handle the response appropriately.
        // Since this is a webpage, we'll need to scrape or parse the page to get the image URL.
        // You can use libraries like Cheerio or Puppeteer if needed.

        const html = await response.text();

        // Example: You would need to parse the HTML and extract the image URL (simplified here)
        const imageUrl = parseImageUrlFromHtml(html); // You need to implement this based on the HTML structure of the page

        if (imageUrl) {
            // If you extracted the image URL, fetch it and send it
            const imageBuffer = await fetch(imageUrl).then(res => res.buffer());

            // Send the image as a message
            await client.sendMessage(m.chat, {
                image: imageBuffer,
                caption: `Logo created for ${text1} & ${text2} by ${botname}`,
            }, { quoted: m });
        } else {
            throw new Error('No image found after generating the logo');
        }

    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        m.reply(`An error occurred: ${error.message}. Please try again later.`);
    }
};

// Dummy function for extracting the image URL from HTML (to be replaced with real scraping logic)
function parseImageUrlFromHtml(html) {
    // You would need to implement parsing logic here, for example using a library like Cheerio to extract the image URL
    // This is just an example, you need to inspect the HTML of the page and extract the URL accordingly
    const regex = /src="(https:\/\/[^"]+\.jpg)"/; // Example: looks for an image URL in the src attribute
    const match = html.match(regex);
    return match ? match[1] : null;
}
