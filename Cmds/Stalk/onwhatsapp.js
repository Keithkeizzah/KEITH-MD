module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    if (!text) {
      return m.reply("❌ Please provide a phone number to check.");
    }

    const id = text.trim();
    const [result] = await client.onWhatsApp(id);

    if (result && result.exists) {
      m.reply(`✅ ${id} exists on WhatsApp, as jid: ${result.jid}`);
    } else {
      m.reply(`❌ ${id} does not exist on WhatsApp.`);
    }
  } catch (error) {
    console.error("Error in checking WhatsApp number:", error);
    m.reply("❌ An error occurred while checking the WhatsApp number. Please try again later.");
  }
};
