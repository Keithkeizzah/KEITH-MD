module.exports = async (context) => {

const { client, m, text, botname  } = context;

const axios = require('axios');
const cheerio = require('cheerio');

async function MediaFire(url, options) {
  try {
    let mime;
    options = options ? options : {};
    const res = await axios.get(url, options);
    const $ = cheerio.load(res.data);
    const hasil = [];
    const link = $('a#downloadButton').attr('href');
    const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '');
    const seplit = link.split('/');
    const nama = seplit[5];
    mime = nama.split('.');
    mime = mime[1];
    hasil.push({ nama, mime, size, link });
    return hasil;
  } catch (err) {
    return err;
  }
}

if (!text) return m.reply("provide mediafire link for download");

if (!text.includes('mediafire.com')) {
        return m.reply(`Doesnt look like a mediafire link, uh?`);
    }


await m.reply(`A moment...`);

try {

        const fileInfo = await MediaFire(text);



if (!fileInfo || !fileInfo.length) {
    return m.reply("Sorry, this file is no longer stored in mediafire.");
}






        await client.sendMessage(
            m.chat,
            {
                document: {
                    url: fileInfo[0].link,
                },
                fileName: fileInfo[0].nama,
                mimetype: fileInfo[0].mime,
                caption: `${fileInfo[0].nama} downloaded by ${botname}`, 
            },
            { quoted: m }


   );

} catch (error) {


        m.reply(`An error occured:\n` + error);
    }

}