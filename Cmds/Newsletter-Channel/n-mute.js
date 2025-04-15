module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    // Mute the newsletter
    await client.newsletterMute(m.chat);

    // Confirmation message
    return sendReply(client, m, "This newsletter has been muted successfully. 🔇");
};
