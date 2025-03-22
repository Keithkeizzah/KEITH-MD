module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    // Follow the newsletter
    await client.newsletterFollow(m.chat);

    // Confirmation message
    return sendReply(client, m, "You are now following this newsletter. 📩");
};
