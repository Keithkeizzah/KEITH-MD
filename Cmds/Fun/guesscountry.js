module.exports = async (context) => {
    const { client, m, text, sendReply, botname, author, sendMediaMessage } = context;

    try {
        if (!text) {
            return await sendReply(client, m, '🌍 Please provide a name to analyze\nExample: *country John*');
        }

        const apiUrl = `https://api.nationalize.io/?name=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        
        if (!data?.country?.length) {
            return await sendReply(client, m, `❌ No country data found for "${text}"`);
        }

        let output = `🌐 ${botname} 𝗖𝗢𝗨𝗡𝗧𝗥𝗬 𝗚𝗨𝗘𝗦𝗦𝗘𝗥\n\n` +
                     `✍️ *Name:* ${data.name}\n\n` +
                     `📊 *Likely Nationalities:*\n`;
        
        data.country.slice(0, 5).forEach((c, index) => {
            output += `${index + 1}. ${getCountryName(c.country_id)} (${(c.probability * 100).toFixed(1)}%)\n`;
        });

        output += `\n╰────────────────────\n` +
                  `_Powered by nationalize.io_`;

        await sendReply(client, m, output);

    } catch (error) {
        console.error('Country Guess Error:', error);
        const errorMessage = error.message.includes('API') 
            ? '⚠️ Failed to access nationality service'
            : '❌ Error processing your request';
        await sendReply(client, m, errorMessage);
    }
};

// Helper function to convert country codes to names
function getCountryName(code) {
    const countryNames = {
        US: 'United States',
        NG: 'Nigeria',
        IN: 'India',
        CN: 'China',
        BR: 'Brazil',
        // Add more country codes as needed
    };
    return countryNames[code] || code;
}
