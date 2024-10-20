module.exports = async (context) => {
    const { client, m, text } = context;

    if (!text) {
        return m.reply("Prodide a query.");
    }

    try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "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" });

        const model = process.env.GROQ_MODEL || "llama3-8b-8192";
        const systemMessage = process.env.GROQ_SYSTEM_MSG || "Make sure the answer is simple and easy to understand.";

        async function getGroqChatCompletion(query) {
            return groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: systemMessage,
                    },
                    {
                        role: "user",
                        content: query,
                    },
                ],
                model: model,
            });
        }

        const chatCompletion = await getGroqChatCompletion(text);
        const content = chatCompletion.choices[0]?.message?.content || "No response received.";

        await client.sendMessage(m.chat, { text: content }, { quoted: m });

    } catch (error) {
        console.error("Error:", error);
        m.reply("An error occurred.\n" + error);
    }
};
