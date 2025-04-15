const fetch = require('node-fetch');

module.exports = async (context) => {
    const { client, m, text } = context;

    if (!text) return m.reply("Provide a valid URL to fetch!");

    try {
        const response = await fetch(text);
        const contentType = response.headers.get('content-type');

        if (!contentType) {
            return m.reply("The server did not return a content-type.");
        }

        console.log("Content-Type:", contentType);

        if (contentType.includes('application/json')) {
            const data = await response.json();
            return m.reply(JSON.stringify(data, null, 2));
        }

        if (contentType.includes('text/html')) {
            const html = await response.text();
            return m.reply(html);
        }

        if (contentType.includes('image')) {
            const imageBuffer = await response.buffer();
            return client.sendMessage(
                m.chat,
                { image: imageBuffer, caption: text },
                { quoted: m }
            );
        }

        if (contentType.includes('video')) {
            const videoBuffer = await response.buffer();
            return client.sendMessage(
                m.chat,
                { video: videoBuffer, caption: text },
                { quoted: m }
            );
        }

        if (contentType.includes('audio')) {
            const audioBuffer = await response.buffer();
            const filename = text.split('/').pop(); 
            return client.sendMessage(
                m.chat,
                {
                    audio: { url: text },
                    mimetype: "audio/mpeg",
                    fileName: filename,
                },
                { quoted: m }
            );
        }

        if (contentType.includes('application/pdf')) {
            return client.sendMessage(
                m.chat,
                {
                    document: { url: text },
                    mimetype: "application/pdf",
                    fileName: text.split('/').pop(),
                },
                { quoted: m }
            );
        }

        if (contentType.includes('application')) {
            return client.sendMessage(
                m.chat,
                {
                    document: { url: text },
                    mimetype: contentType,
                    fileName: text.split('/').pop(),
                },
                { quoted: m }
            );
        }

        return m.reply("The content type is unsupported or could not be determined.");
    } catch (error) {
        console.error(error);
        return m.reply("An error occurred while fetching the URL.");
    }
};
