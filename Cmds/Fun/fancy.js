module.exports = async (context) => {
    const { client, m, text } = context;
    const axios = require("axios");

    try {
        // If no text is provided, return a usage instruction
        if (!text) {
            return await m.reply(
                `Keith Fancy Text Converter Here.\n Please use .fancy *_your_text_* or .fancy *_style_id_ your_text_* to get a specific style.`
            );
        }

        // Extract ID and text (style number and the text to be converted)
        const args = text.split(" ");
        const id = args[0]?.match(/\d+/)?.[0]; // First argument could be an ID
        const inputText = args.slice(1).join(" "); // Rest of the arguments form the text

        // If no valid text or ID, show usage instructions
        if (!inputText) {
            return await m.reply(
                `Please provide both style number (optional) and the text. Usage: .fancy *_your_text_* or .fancy *_style_id_ your_text_*`
            );
        }

        // API request to get the fancy styles
        const apiUrl = `https://api-smd.onrender.com/api/styletext?url=${encodeURIComponent(inputText)}`;
        const response = await axios.get(apiUrl);

        // Check if the response contains the 'result' array
        if (response.data && response.data.result) {
            const styles = response.data.result;

            // Limit the number of styles to a maximum of 35
            const maxStyles = 35;
            const limitedStyles = styles.slice(0, maxStyles);

            // If an ID was provided and is within valid range
            if (id && id > 0 && id <= limitedStyles.length) {
                const selectedStyle = limitedStyles[id - 1].result;
                await client.sendMessage(m.chat, {
                    text: `Fancy Text Style ${id}:\n\n${selectedStyle}`
                }, { quoted: m });
            } else {
                // If no ID provided or it's invalid, list all available styles up to the limit
                let styleList = "Fancy Text Styles:\n\n";
                limitedStyles.forEach((style, index) => {
                    if (style.result.trim()) {
                        styleList += `${index + 1}. ${style.result}\n`;
                    }
                });

                // If there are valid styles, send them
                if (styleList.trim() !== "Fancy Text Styles:") {
                    await client.sendMessage(m.chat, {
                        text: styleList.trim()
                    }, { quoted: m });
                } else {
                    await m.reply("No valid fancy text styles were generated.");
                }
            }
        } else {
            throw new Error("Invalid response from Keith API.");
        }
    } catch (error) {
        // Log and inform the user in case of an error
        console.error("Error getting Keith API response:", error.message);
        await m.reply("Error getting response from Keith API.");
    }
};
