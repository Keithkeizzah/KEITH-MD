const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware'); 

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m, text, Owner, generateProfilePicture, botNumber, mime, msgDreaded } = context;

try {
const fs = require("fs");

if(!msgDreaded) { m.reply('Quote an image...') ; return } ;


let media;
if (msgDreaded.imageMessage) {
     media = msgDreaded.imageMessage

  } else {
    m.reply('This is not an image...'); return
  } ;

var medis = await client.downloadAndSaveMediaMessage(media);



                    var {
                        img
                    } = await generateProfilePicture(medis)
                    await client.query({
                        tag: 'iq',
                        attrs: {
                            to: botNumber,
                            type: 'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [{
                            tag: 'picture',
                            attrs: {
                                type: 'image'
                            },
                            content: img
                        }]
                    })
                    fs.unlinkSync(medis)
                    m.reply("Bot Profile Picture Updated")

} catch (error) {

m.reply("An error occured while updating bot profile photo\n" + error)

}

                })




}
