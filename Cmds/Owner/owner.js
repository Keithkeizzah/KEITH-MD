module.exports = async (context) => {
  try {
    const { client, m, text, botname, dev } = context;

    if (!m.quoted) {
      return m.reply("❌ Please quote a message to create a VCard.");
    }

    if (!text) {
      return m.reply("❌ Please provide a name for the VCard. Example: `.vcard Brian`");
    }

    const name = text.trim();
    const jid = m.quoted.sender;
    const number = jid.split('@')[0];  // Extracting the pure number from the quoted message's JID

    // Prepare VCard for the quoted message's number
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${name}`,
      `ORG:${botname};`, // Using the botname from the context
      `TEL;type=CELL;type=VOICE;waid=${number}:${number}`,
      'END:VCARD'
    ].join('\n');

    // Inform about the developer contact
    await client.sendMessage(m.chat, {
      text: `Below is the VCard for ${name}:`,
    }, { quoted: m });

    // Send message with VCard contact
    await client.sendMessage(m.chat, {
      contacts: {
        displayName: name,
        contacts: [{ vcard }],
      },
    }, { quoted: m });

    // Inform about the developer contact
    await client.sendMessage(m.chat, {
      text: `If you need further assistance, please contact ${dev}`,
    }, { quoted: m });

  } catch (e) {
    console.error("Error in creating VCard:", e);
    m.reply("❌ An error occurred while creating the VCard. Please try again later.");
  }
};
