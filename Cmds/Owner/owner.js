const { getAllSudoNumbers, isSudoTableNotEmpty } = require("../lib/sudo");
const s = require("../settings");

module.exports = async (context) => {
  const { client, m } = context;

  // Check if the sudo table is not empty
  const thsudo = await isSudoTableNotEmpty();

  if (thsudo) {
    let msg = `*My Super-User*\n*Owner Number*\n:\n- 🌟 @${s.DEV}\n\n------ *Other Sudos* -----\n`;

    // Fetch all sudo numbers
    let sudos = await getAllSudoNumbers();

    // Loop through the sudo numbers and format them properly
    for (const sudo of sudos) {
      if (sudo) { // Strict check to ensure it's not empty or undefined
        let sudonumero = sudo.replace(/[^0-9]/g, ''); // Strip non-numeric characters
        msg += `- 💼 @${sudonumero}\n`;
      }
    }

    // Create the owner JID
    const ownerjid = s.DEV.replace(/[^0-9]/g, '') + "@s.whatsapp.net";

    // Prepare mentioned JIDs for the message
    const mentionedJid = sudos.concat([ownerjid]);

    // Send the message with image and mentions
    client.sendMessage(
      m.chat, // Destination chat is now inferred from the context message `m`
      {
        image: { url: "https://i.imgur.com/HfeSoW0.jpeg" }, // Use the provided image URL
        caption: msg,
        mentions: mentionedJid,
      }
    );
  } else {
    // If sudo table is empty, send a vCard for the owner
    const vcard =
      'BEGIN:VCARD\n' + 
      'VERSION:3.0\n' + 
      'FN:' + s.DEV + '\n' + 
      'ORG:undefined;\n' + 
      'TEL;type=CELL;type=VOICE;waid=' + s.DEV + ':+' + s.DEV + '\n' + 
      'END:VCARD';

    // Send the contact card as a message
    client.sendMessage(m.chat, {
      contacts: {
        displayName: s.DEV,
        contacts: [{ vcard }],
      },
    }, { quoted: m });
  }
};
