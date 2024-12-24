module.exports = async (context) => {
    const { client, m } = context;

    // Fetch a random dare from the new API
    const response = await fetch('https://shizoapi.onrender.com/api/texts/dare?apikey=shizo');
    const data = await response.json();

    // Extract the dare text from the response
    const { dare } = data;

    // Send the dare text as a message
    await client.sendMessage(m.chat, { text: dare }, { quoted: m });
};
