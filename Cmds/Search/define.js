module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        if (!text) {
            return m.reply('Please provide a term.');
        }

        const term = encodeURIComponent(text);
        const response = await fetch(`http://api.urbandictionary.com/v0/define?term=${term}`);
        const data = await response.json();

        if (!data.list || data.list.length === 0) {
            return m.reply('No definitions found for that term.');
        }

        const definition = data.list[0];
        const definitionMessage = `
            Word: ${definition.word}
            Definition: ${definition.definition.replace(/\[|\]/g, '')}
            Example: ${definition.example.replace(/\[|\]/g, '')}
        `;

        await client.sendMessage(m.chat, { text: definitionMessage }, { quoted: m });

    } catch (error) {
        console.error("Error occurred:", error);
        m.reply('An error occurred while fetching the data. Please try again later.');
    }
};
