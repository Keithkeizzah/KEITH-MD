const { botname } = require(__dirname + "/../../settings");
const speed = require("performance-now");

// Function to create a delay
function delay(ms) {
  console.log(`⏱️ Delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to show loading animation
async function loading(m, client) {
  const loadingSymbols = ["💜", "⚔️", "💖", "🖤", "💙", "💚"];
  let { key } = await client.sendMessage(m.chat, { text: '*🇰🇪Enjoy...with Keith Md.....*' });

  // Run the loading animation without blocking the main code
  for (let i = 0; i < loadingSymbols.length; i++) {
    await client.sendMessage(m.chat, { text: loadingSymbols[i], edit: key });
    await delay(500); // Adjust the speed of the animation
  }

  // Delete the loading message after the animation is complete
  await client.sendMessage(m.chat, { delete: key });
}

// Main handler function
module.exports = async (context) => {
  const { client, m } = context;

  try {
    // Calculate the ping speed
    const timestamp = speed();
    const pingSpeed = speed() - timestamp;

    // Create a custom contact message
    let customContactMessage = {
      key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
      message: {
        contactMessage: {
          displayName: botname,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${botname}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        },
      },
    };

    // Send ping message immediately
    await client.sendMessage(m.chat, { text: `${pingSpeed.toFixed(4)} m/s..` }, { quoted: customContactMessage });

    // Show loading animation after sending the ping message
    await loading(m, client);

  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error sending message:", error);
    m.reply('An error occurred while sending the message.');
  }
};
