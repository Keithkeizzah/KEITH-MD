const API_URL = 'https://shizoapi.onrender.com/api/texts/truth';
const API_KEY = 'shizo';

module.exports = async (context) => {
    const { client, m } = context;

    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const { news } = await response.json();

        await client.sendMessage(m.chat, { text: news }, { quoted: m });
    } catch (error) {
        console.error('Error fetching data:', error);
        await client.sendMessage(m.chat, { text: 'An error occurred while fetching the news.' }, { quoted: m });
    }
};
