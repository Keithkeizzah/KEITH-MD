const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = async (context) => {

const { client, m, pushname, msgDreaded } = context;

if(!msgDreaded) { m.reply('Quote an image, a short video or a sticker to change watermark.') ; return } ;


let media;
if (msgDreaded.imageMessage) {
     media = msgDreaded.imageMessage
  } else if(msgDreaded.videoMessage) {
media = msgDreaded.videoMessage
  } 
  else if (msgDreaded.stickerMessage) {
    media = msgDreaded.stickerMessage ;
  } else {
    m.reply('This is neither a sticker, image nor a video...'); return
  } ;

var result = await client.downloadAndSaveMediaMessage(media);

let stickerResult = new Sticker(result, {
            pack: pushname,
            author: pushname,
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
const Buffer = await stickerResult.toBuffer();
          client.sendMessage(m.chat, { sticker: Buffer }, { quoted: m });

}