module.exports = async (context) => {
    const { client, m, text, sendReply, botname, sendMediaMessage } = context;

    try {
        if (!text) {
            return await sendReply(client, m, '📖 Please specify the book, chapter, and verse you want to read.\nExample: bible john 3:16');
        }

        const reference = encodeURIComponent(text);
        const apiUrl = `https://bible-api.com/${reference}?translation=kjv`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        if (!data?.reference) throw new Error('Invalid scripture reference');

        const bibleText = `📖 ${botname} 𝗠𝗗 𝗕𝗜𝗕𝗟𝗘\n
*Reference:* ${data.reference}
*Verses:* ${data.verses.length}
*Translation:* ${data.translation_name}

${data.text.trim()}`;

        await sendMediaMessage(client, m, { text: bibleText });

    } catch (error) {
        console.error('Bible Module Error:', error);
        const errorMessage = error.message.includes('Invalid') 
            ? '❌ Invalid scripture reference. Example: bible john 3:16' 
            : '⛔ Error fetching Bible text. Please try again later.';
        await sendReply(client, m, errorMessage);
    }
};
