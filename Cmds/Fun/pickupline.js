const API_URL = 'https://api.popcat.xyz/pickuplines';

module.exports = async (context) => {
    const { client, m } = context;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch data');

        const { pickupline } = await response.json();
        const lineMessage = `
┏━━━ *KEITH-FACT* ━━━◆                     
┃
┃   *◇* ${pickupline} 
┃
┃   *◇* Regards *KEITH MD*
┃      
 ╭───────────────◆
 │ *_Powered by keithkeizzah._*
 ╰───────────────◆
        `;

        await client.sendMessage(m.chat, { text: lineMessage }, { quoted: m });
    } catch (error) {
        console.error('Error fetching data:', error);
        await client.sendMessage(m.chat, { text: 'An error occurred while fetching the fact.' }, { quoted: m });
    }
};



