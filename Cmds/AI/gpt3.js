module.exports = async (context) => {
    const { client, m, text } = context;

    if (!text) return m.reply("Please provide text");

    const { GiftedGpt } = require("gifted-gpt");

    try {
        const gpt4 = new GiftedGpt();
        
        const messages = [
            { role: 'user', content: text },
            { role: 'system', content: 'You are an assistant in WhatsApp. You are called Keith. You respond to user commands.' }
        ];

        const response = await GiftedGpt.generate(gpt4, messages);
        
        await m.reply(response);
    } catch (error) {
        console.error("Error generating response:", error);
        await m.reply("An error occurred while processing your request.");
    }
};
