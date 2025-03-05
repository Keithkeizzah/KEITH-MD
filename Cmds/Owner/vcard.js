module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    if (!m.quoted) {
      return m.reply("❌ Please quote a message to create a VCard.");
    }

    if (!text) {
      return m.reply("❌ Please provide a name for the VCard. Example: `.vcard Brian`");
    }

    const name = text.trim();
    const number = m.quoted.sender;  // Fetching the number from the quoted message's JID

    // Prepare VCard for the quoted message's number
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${name}`,
      'ORG:undefined;',
      `TEL;type=CELL;type=VOICE;waid=${number}:${number}`,
      'END:VCARD'
    ].join('\n');

    // Send message with VCard contact
    await client.sendMessage(m.chat, {
      contacts: {
        displayName: name,
        contacts: [{ vcard }],
      },
    }, { quoted: m });

  } catch (e) {
    console.error("Error in creating VCard:", e);
    m.reply("❌ An error occurred while creating the VCard. Please try again later.");
  }
};
