const fetch = require('node-fetch'); 

module.exports = async (context) => {
    const { client, m, sendReply, sendMediaMessage } = context;

    try {
        
        const response = await fetch('https://shizoapi.onrender.com/api/texts/dare?apikey=shizo');
        
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
       
        const data = await response.json();
        
        
        if (!data?.dare) {
            throw new Error('Invalid dare response');
        }
       
        
        await sendReply(client, m, `💥 *DARE OF THE DAY*\n\n${data.dare}`);

    } catch (error) {
        
        console.error('Dare Module Error:', error);
        
        
        await sendReply(client, m, '❌ Failed to fetch dare. Please try again later.');
    }
};
