
const speed = require("performance-now");


function delay(ms) {
  console.log(`⏱️ Delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function loading(m, client) {
  const loadingSymbols = ["💜", "⚔️", "💖", "🖤", "💙", "💚"];
  let { key } = await client.sendMessage(m.chat, { text: '*🇰🇪Enjoy...with Keith Md.....*' });

  
  for (let i = 0; i < loadingSymbols.length; i++) {
    await client.sendMessage(m.chat, { text: loadingSymbols[i], edit: key });
    await delay(500); 
  }

  
  await client.sendMessage(m.chat, { delete: key });
}


module.exports = async (context) => {
  const { client, m, botname, author } = context;

  try {
    
    const timestamp = speed();
    const pingSpeed = speed() - timestamp;

    
    let customContactMessage = {
      key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
      message: {
        contactMessage: {
          displayName: author,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${author}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        },
      },
    };

    
    await client.sendMessage(m.chat, { text: `${botname} speed\n\n *${pingSpeed.toFixed(4)} m/s..*` }, { quoted: customContactMessage });

    
    await loading(m, client);

  } catch (error) {
   
    console.error("Error sending message:", error);
    m.reply('An error occurred while sending the message.');
  }
};
