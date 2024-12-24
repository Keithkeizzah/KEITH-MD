module.exports = async (context) => {
  try {
    const { client, m, botname, dev } = context;

    // Ensure dev (WhatsApp ID) is a valid phone number string
    const waid = dev.startsWith('+') ? dev : `+${dev}`;

    // Create a vCard with the bot's name and the owner's WhatsApp number
    const vcard = 
      `BEGIN:VCARD\n` +
      `VERSION:3.0\n` +
      `FN:${botname}\n` +  // Full name of the bot
      `TEL;type=CELL;type=VOICE;waid=${waid}:${waid}\n` +  // WhatsApp ID and phone number
      `END:VCARD`;

    // Send the contact card to the chat
    await client.sendMessage(m.chat, {
      contacts: {
        displayName: botname,
        contacts: [{ vcard }],
      },
    }, { quoted: m });
  } catch (error) {
    console.error("Error sending contact card:", error);
  }
};
