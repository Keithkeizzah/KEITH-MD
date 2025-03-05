module.exports = async (context) => {
  try {
    const { client, m } = context;

    if (!m.quoted) {
      return m.reply("❌ Please quote a message to fetch the status.");
    }

    const quotedJid = m.quoted.sender;  // Fetching the JID from the quoted message

    const status = await client.fetchStatus(quotedJid);

    m.reply(`✅ Status of ${quotedJid}: ${status}`);
  } catch (error) {
    console.error("Error in fetching status:", error);
    m.reply("❌ An error occurred while fetching the status. Please try again later.");
  }
};
