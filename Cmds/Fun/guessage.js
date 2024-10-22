module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        if (!text) {
            return m.reply('Please provide a name.');
        }

        const name = encodeURIComponent(text);
        const response = await fetch(`https://api.agify.io/?name=${name}`);
        const data = await response.json();

        if (!data.age) {
            return m.reply('No valid name found.');
        }

        const messageText = `
 *KEITH-MD GUESS AGE* 
      
 *_Name:_* ${data.name}
 *_Count:_* ${data.count}
 *_Estimated Age:_* ${data.age}
╭──────────────◆
│ *_Powered by keithkeizzah._*
╰───────────────◆ `;
        
        await client.sendMessage(m.chat, { text: messageText }, { quoted: m });

    } catch (error) {
        console.error("Error occurred:", error);
        m.reply('An error occurred while fetching the data. Please try again later.');
    }
};
