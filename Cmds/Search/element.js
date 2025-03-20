module.exports = async (context) => {
    const { client, m, text, sendReply, botname, sendMediaMessage } = context;

    try {
        if (!text) {
            return await sendReply(client, m, '🔬 Please provide an element name.\nExample: *element sodium*\n\nType *elementlist* for all elements');
        }

        const apiUrl = `https://api.popcat.xyz/periodic-table?element=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error('Element not found');
        const data = await response.json();
        
        if (!data?.name) {
            return await sendReply(client, m, '❌ Element not found. Type *elementlist* for the periodic table');
        }

        const {
            name, symbol, atomic_number,
            atomic_mass, period, phase,
            summary, image
        } = data;

        const elementInfo = `⚛️ ${botname} 𝗘𝗟𝗘𝗠𝗘𝗡𝗧 𝗗𝗔𝗧𝗔

*Name:* ${name}
*Symbol:* ${symbol}
*Atomic Number:* ${atomic_number}
*Atomic Mass:* ${atomic_mass}
*Period:* ${period}
*Phase:* ${phase}

📝 *Summary:*
${summary.trim()}

🔎 Type *elementlist* for more elements`;

        await sendMediaMessage(client, m, { 
            image: { url: image }, 
            caption: elementInfo 
        });

    } catch (error) {
        console.error('Element Module Error:', error);
        const errorMessage = error.message.includes('not found') 
            ? '🔍 Element not found. Check spelling or type *elementlist*'
            : '⚠️ Error fetching element data. Please try again later.';
        await sendReply(client, m, errorMessage);
    }
};
