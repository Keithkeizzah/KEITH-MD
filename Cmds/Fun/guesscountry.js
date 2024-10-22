module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        if (!text) {
            return m.reply('Please provide a name.');
        }

        const name = encodeURIComponent(text);
        const response = await fetch(`https://api.nationalize.io/?name=${name}`);

        if (!response.ok) {
            return m.reply('Failed to fetch data from the API. Please try again later.');
        }

        const data = await response.json();

        if (!data.name || !data.country) {
            return m.reply('No valid name found.');
        }

        let output = `
 *KEITH-MD GUESS COUNTRY* 
      
 *_Name:_* ${data.name}
 *_Likely Countries:_*`;

        data.country.forEach((c, index) => {
            output += `\n${index + 1}. ${c.country_id} (${(c.probability * 100).toFixed(2)}%)`;
        });

        output += `
╭──────────────◆
│ *_Powered by keithkeizzah._*
╰───────────────◆`;

        await client.sendMessage(m.chat, { text: output }, { quoted: m });

    } catch (error) {
        console.error("Error occurred:", error);
        m.reply('An error occurred while fetching the data. Please try again later.');
    }
};
