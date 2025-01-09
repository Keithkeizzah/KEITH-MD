const fs = require('fs');
const ai = require('unlimited-ai');

module.exports = async (context) => {
    const { client, m, text } = context;

    if (!text) return m.reply("Please provide text");

    // Load previous conversation from store.json, if exists
    let conversationData = [];
    try {
        const rawData = fs.readFileSync('store.json');
        conversationData = JSON.parse(rawData);
    } catch (err) {
        
        console.log('No previous conversation found, starting new one.');
    }

    // Define the model and the user/system message
    const model = 'gpt-4-turbo-2024-04-09';
    const userMessage = { role: 'user', content: text };
    const systemMessage = { role: 'system', content: 'You are an assistant in WhatsApp. You are called Keith. You respond to user commands.' };

    // Add user input to the conversation data
    conversationData.push(userMessage);
    conversationData.push(systemMessage);

    try {
        // Get AI response from the model
        const aiResponse = await ai.generate(model, conversationData);

        // Add AI response to the conversation data
        conversationData.push({ role: 'assistant', content: aiResponse });

        // Write the updated conversation data to store.json
        fs.writeFileSync('store.json', JSON.stringify(conversationData, null, 2));

        // Reply to the user with AI's response
        await m.reply(aiResponse);
    } catch (error) {
        console.error("Error with AI generation: ", error);
        await m.reply("Sorry, there was an error generating the response.");
    }
};
