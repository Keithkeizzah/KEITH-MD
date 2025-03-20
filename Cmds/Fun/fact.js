const API_URL = 'https://nekos.life/api/v2/fact';

module.exports = async (context) => {
    const { client, m } = context;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch data');

        const { fact } = await response.json();
        const factMessage = `
┏━━━ *KEITH-FACT* ━━━◆                     
┃
┃   *◇* ${fact} 
┃
┃   *◇* Regards *KEITH MD*
┃      
 ╭───────────────◆
 │ *_Powered by keithkeizzah._*
 ╰───────────────◆
        `;

        await client.sendMessage(m.chat, { text: factMessage }, { quoted: m });
    } catch (error) {
        console.error('Error fetching data:', error);
        await client.sendMessage(m.chat, { text: 'An error occurred while fetching the fact.' }, { quoted: m });
    }
};
