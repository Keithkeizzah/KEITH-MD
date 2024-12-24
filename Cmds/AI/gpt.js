module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        if (!text) return m.reply("This is Keith assistant what is your query?");

       
        const { default: Gemini } = await import('gemini-ai');

        const gemini = new Gemini("AIzaSyBK1U4dgP9XtN6qgyB3YtMD5nsLbmM7ruM");
        const chat = gemini.createChat();

        const res = await chat.ask(text);

        await m.reply(res);
    } catch (e) {
        m.reply("I am unable to generate responses\n\n" + e);
    }
};
