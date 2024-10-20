module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        if (!text) return m.reply("This is chatgpt. Provide a text.");

     
   const response = await fetch(`https://api.maher-zubair.tech/ai/chatgpt?q=${text}`)

const data = await response.json()

await m.reply(data.result);


} catch (e) {
console.log(e)

m.reply("Error occured")

}

}
