module.exports = async (context) => {

const { client, m, text, botname } = context;

if (!text) return m.reply("Provide a Facebook link for the video");

if (!text.includes('facebook.com')) return m.reply("That is not a Facebook link");

try {

const response = await fetch(`https://api.prabath-md.tech/api/fdown?url=${text}`);
const data = await response.json();


const fbvid = data.data.sd;

await client.sendMessage(m.chat,{video : {url : fbvid },caption : `Downloaded by ${botname}`,gifPlayback : false },{quoted : m}) 

} catch (e) {

m.reply("An error occured. API might be down\n" + e)

}

}