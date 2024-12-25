const lyricsFinder = require('lyrics-finder');
const yts = require('yt-search');

module.exports = async (context) => {
  const { client, m, text } = context;
  
  try {
    
    if (!text) return m.reply("Please provide a song name and artist.");
      
    const info = await yts(text);
    const results = info.videos;
  
    if (!results || results.length === 0) {
      return m.reply("No results found for the given song or artist.");
    }
 
    const songDetails = text.split(' ').reverse(); 
    const title = songDetails.slice(0, songDetails.length - 1).join(' '); 
    const artist = songDetails[songDetails.length - 1]; 
        
    const lyrics = await lyricsFinder(artist, title);

    if (!lyrics) {
      return m.reply(`Sorry, I couldn't find any lyrics for "${text}". Please try another song.`);
    }

    const formattedMessage = `
*KEITH-MD LYRICS FINDER*
*Title:* ${title}
*Artist:* ${artist}

${lyrics}
    `;

    await client.sendMessage(m.chat, { 
      image: { url: results[0].thumbnail }, 
      caption: formattedMessage 
    }, { quoted: m });

  } catch (error) {
    m.reply(`Error: I was unable to fetch the lyrics. Please try again later.\n\n${error.message}`);
    console.log(error);
  }
};
