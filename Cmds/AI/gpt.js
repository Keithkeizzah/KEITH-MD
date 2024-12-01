module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        if (!text) return m.reply("This is Keith assistant what is your query?");

       
        const { default: Gemini } = await import('gemini-ai');

        const gemini = new Gemini("QUl6YVN5QndaN3FwYkRaZmJQVHRnV0hWMkcySk5WZW05RURLUmVF");
        const chat = gemini.createChat();

        const res = await chat.ask(text);

        await m.reply(res);
    } catch (e) {
        m.reply("I am unable to generate responses\n\n" + e);
    }
};
