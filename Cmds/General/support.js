module.exports = async (context) => {
  const { client, m } = context;


  const messageCaption = `
   *Follow my channels and join my  groups for more updates*
  ╭────────────────
  │ *Wachannel:* https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47
    
  │ *wagroup:*  https://chat.whatsapp.com/DvXonepPp1XBPOYIBziTl1

  │ *Telegram:*  https://t.me/keithmd
    
  │ *Contact owner:* https://wa.me/qr/7HLS3WQTBCI6O1

 ╰─────────────────── 
  `;

  // Prepare the image URL
  const image = {
    url: "https://files.catbox.moe/yldsxj.jpg"
  };

  // Prepare the message object
  const message = {
    image: image,
    caption: messageCaption
  };

  // Send the message
  await client.sendMessage(m.chat, message, { quoted: m });
};

