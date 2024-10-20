const axios = require('axios');
const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");
const {youtubedl, youtubedlv2} = require('@bochilteam/scraper');

module.exports = async (context) => {
    const { client, m, text, ytmp3 } = context;

async function search(query, options = {}) {
  const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
  return search.videos;
} 

function bytesToSize(bytes) {
  return new Promise((resolve, reject) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) resolve(`${bytes} ${sizes[i]}`);
    resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`);
  });
}

const getBuffer = async (url, options) => {
    options ? options : {};
    const res = await axios({method: 'get', url, headers: {'DNT': 1, 'Upgrade-Insecure-Request': 1,}, ...options, responseType: 'arraybuffer'});
    return res.data;
};


let limit = 20

try {

if (!text) {
            m.reply('What song do you want to download?')
            return;
        }



const yt_play = await search(text);



const { status, results, error } = await ytmp3(yt_play[0].url);


const ttl = results.title;


      const buff_aud = await getBuffer(results.download);
      const fileSizeInBytes = buff_aud.byteLength;
      const fileSizeInKB = fileSizeInBytes / 1024;
      const fileSizeInMB = fileSizeInKB / 1024;
      const size = fileSizeInMB.toFixed(2);

if (size <= limit) {

        await client.sendMessage(m.chat, { document: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });

} else {

await m.reply(`Failed... Song is too large for uploading...`)

}
      
     


} catch (er) {

m.reply('Error\n' + er)

}


  }
