module.exports = async (context) => {

const { client, m, text, botname } = context;

if (!text) return m.reply("Provide a twitter or X link for the video");



try {

const response = await fetch(`https://api.prabath-md.tech/api/twitterdl?url=${text}`);
const data = await response.json();


const twtvid = data.data.data.SD;

await client.sendMessage(m.chat,{video : {url : twtvid },caption : `Downloaded by ${botname}`,gifPlayback : false },{quoted : m}) 

} catch (e) {

m.reply("An error occured. API might be down\n" + e)

}

}