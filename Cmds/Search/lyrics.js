module.exports = async (context) => {

const { client, m, text } = context;


const Genius = require("genius-lyrics");  const Client = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO"); 

 try { 
 if (!text) return m.reply("Provide a song name!"); 
 const searches = await Client.songs.search(text); 
 const firstSong = searches[0]; 

 const lyrics = await firstSong.lyrics(); 
 await client.sendMessage(m.chat, { text: lyrics}, { quoted: m }); 
 } catch (error) { 
             m.reply(`I did not find any lyrics for ${text}. Try searching a different song.`); 
             console.log(error); 
         } 

}