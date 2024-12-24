const acrcloud = require("acrcloud");
const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");

module.exports = async (context) => {
    const { client, m, text, qmsg, mime } = context;

try {

let acr = new acrcloud({
    host: 'identify-ap-southeast-1.acrcloud.com',
    access_key: '26afd4eec96b0f5e5ab16a7e6e05ab37',
    access_secret: 'wXOZIqdMNZmaHJP1YDWVyeQLg579uK2CfY6hWMN8'
  });

if (!/video|audio/.test(mime)) return m.reply("Tag a short video or audio for the bot to analyse.");

let p = m.quoted ? m.quoted : m

                let buffer = await p.download()
               

let { status, metadata } = await acr.identify(buffer)
                if (status.code !== 0) return m.reply(status.msg); 
                let { title, artists, album, genres, release_date } = metadata.music[0]
                let txt = `Title: ${title}${artists ? `\nArtists: ${artists.map(v => v.name).join(', ')}` : ''}`
                txt += `${album ? `\nAlbum: ${album.name}` : ''}${genres ? `\nGenres: ${genres.map(v => v.name).join(', ')}` : ''}\n`
                txt += `Release Date: ${release_date}`
                 m.reply(txt.trim())

} catch (error) {

await m.reply("Song not recognisable..")

}


}