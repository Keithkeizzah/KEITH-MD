module.exports = async (context) => {
    const { client, m, text, sendReply, sendMediaMessage } = context;

    try {
        // Check if the word was provided
        if (!text) {
            return sendReply(client, m, 'Please provide a word.');
        }

        // Set the word to query the API
        const word = encodeURIComponent(text);

        // Fetch data from the dictionary API
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        // Check if the response is ok
        if (!response.ok) {
            return sendReply(client, m, 'Failed to fetch data. Please try again later.');
        }

        // Parse the response JSON
        const data = await response.json();

        // Check if data is available for the word
        if (!data || !data[0] || !data[0].meanings || data[0].meanings.length === 0) {
            return m.reply('No definitions found for the provided word.');
        }

        // Extract definition, example, and synonyms from the first meaning
        const definitionData = data[0];
        const definition = definitionData.meanings[0].definitions[0].definition;
        const example = definitionData.meanings[0].definitions[0].example || 'No example available';
        const synonyms = definitionData.meanings[0].definitions[0].synonyms?.join(', ') || 'No synonyms available';

        // Prepare the message to send
        const message = `
📚 *Word*: ${definitionData.word}
🔍 *Definition*: ${definition}
📝 *Example*: ${example}
🔗 *Synonyms*: ${synonyms}

*MADE WITH ♥ KEITH-MD*`;

        // Send the message
      await sendMediaMessage(client, m, {text: message});  

    } catch (error) {
        console.error("Error occurred:", error);
        sendReply(client, m, 'An error occurred while fetching the data. Please try again later.\n' + error);
    }
};
