const axios = require("axios");
const { format } = require("util");

module.exports = async (context) => {
    const { client, m, text } = context;

    // Check if text is provided
    if (!text) {
        return m.reply(" Please provide some link.");
    }

    // Validate the URL properly
    const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;
    if (!urlRegex.test(text)) {
        return m.reply("Invalid URL.");
    }

    m.reply("Please wait...");

    try {
        // Extract URL from the message text
        const url = text;

        // Fetch data from the URL
        const res = await axios.get(url);

        // Check if content is neither text nor json
        if (!/text|json/.test(res?.headers?.["content-type"])) {
            const { size, data, ext, mime } = await Func.getFile(url);

            // Check file size limits
            if (size >= config.limit.download.free && !m.isPremium) {
                return m.reply("File size exceeds free download limit.");
            }
            if (size >= config.limit.download.premium && !m.isVIP) {
                return m.reply("File size exceeds premium download limit.");
            }
            if (size >= config.limit.download.VIP) {
                return m.reply("File size exceeds VIP download limit.");
            }

            // Generate filename based on URL or random filename
            const fileName = text.toLowerCase().includes("filename=")
                ? text.split("filename=")[1] + "." + ext
                : Func.getRandom(ext, 20);

            // Check if there's a caption in the URL
            const caption = text.toLowerCase().includes("caption=")
                ? text.split("caption=")[1]
                : "";

            // Send the file
            return client.sendMessage(m.chat, url, {
                mimetype: mime,
                fileName,
                caption,
                quoted: m,
            });
        }

        // If content is text or JSON, format and reply
        const responseText = res?.data;
        try {
            m.reply(format(responseText));
        } catch (e) {
            m.reply("Error formatting the response: " + format(e));
        }
    } catch (error) {
        console.error("Error:", error);
        m.reply("An error occurred while processing your request.");
    }
};
