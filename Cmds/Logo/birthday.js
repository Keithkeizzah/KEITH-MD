const mumaker = require("mumaker");

module.exports = async (context) => {
    const { client, m, text, botname } = context;

    // Check if text is provided for the image
    if (!text || text.trim() === "") {
        return m.reply("Please provide some text to generate the image.");
    }

    try {
        // URL for generating the birthday cake image (or whatever image you want)
        const lien = "https://en.ephoto360.com/birthday-cake-96.html";

        // Notify user that the process is starting
        m.reply("Processing... Please wait.");

        // Generate the image using the mumaker library
        const img = await mumaker.ephoto(lien, text.trim());

        // Check if the image URL is valid
        if (img) {
            // Send the generated image as a message
            await client.sendMessage(m.chat, {
                image: { url: img },
                caption: `Generated  by ${botname}`,
                gifPlayback: false, // Ensure the image is sent as a static image
            }, { quoted: m });
        } else {
            m.reply("Sorry, something went wrong while generating the image.");
        }
    } catch (error) {
        // Log the error for debugging
        console.error("Error generating image:", error);

        // Notify the user of the error
        m.reply("An error occurred. Please try again later.");
    }
};
