const axios = require("axios");
const { format } = require("util");

module.exports = async (context) => {
    const { client, m, text } = context;

    // Check if there's no text provided
    if (!text) {
        return m.reply("This is ChatGPT. Please provide some text.");
    }

    // Ensure the input is a valid URL
    if (!/^https?:\/\//.test(m.text)) {
        return m.reply("Invalid URL.");
    }

    m.reply("Please wait...");

    try {
        const url = Func.isUrl(m.text)[0];
        const res = await axios.get(url);

        // Check if the content type is neither text nor json
        if (!/text|json/.test(res?.headers?.get("content-type"))) {
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

            // Generate the filename based on the URL or use a random filename
            const fileName = m?.text?.toLowerCase()?.includes("filename=")
                ? m.text.split("filename=")[1] + "." + ext
                : Func.getRandom(ext, 20);

            // Check if there's a caption in the URL
            const caption = m?.text?.toLowerCase()?.includes("caption=")
                ? m.text.split("caption=")[1]
                : "";

            // Send the file
            return client.sendMessage(m.chat, url, {
                mimetype: res?.headers?.get("content-type"),
                fileName,
                caption,
                quoted: m,
            });
        }

        // If the content is text or JSON, format and reply
        const responseText = res?.data;
        try {
            m.reply(format(responseText));
        } catch (e) {
            m.reply(format(e));
        }
    } catch (error) {
        console.error("Error:", error);
        m.reply("An error occurred while processing your request.");
    }
};
