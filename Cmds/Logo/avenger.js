const fetch = require('node-fetch');
const mumaker = require('mumaker'); // Assuming mumaker is the logo generation tool

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

        // Use mumaker to create the logo (assuming it has a `createLogo` method or similar)
        const logoData = await mumaker.createLogo({
            text1: text1,
            text2: text2,
            size: 'large', // You can adjust this based on your needs
        });

        // Check if mumaker returned a valid logo image
        if (!logoData || !logoData.imageUrl) {
            throw new Error('No logo returned from mumaker');
        }

        // Fetch the image buffer from the generated image URL (if the URL is returned)
        const imageBuffer = await fetch(logoData.imageUrl).then(res => res.buffer());

        // Send the logo image as a message
        await client.sendMessage(m.chat, {
            image: imageBuffer,
            caption: `Logo created for ${text1} & ${text2} by ${botname}`,
        }, { quoted: m });

    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        m.reply(`An error occurred: ${error.message}. Please try again later.`);
    }
};
