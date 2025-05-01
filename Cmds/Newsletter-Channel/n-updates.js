module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    // Subscribe to live updates for the newsletter
    const result = await client.subscribeNewsletterUpdates(m.chat);

    // Confirmation or response based on the result
    if (result) {
        return sendReply(client, m, "You are now subscribed to live updates for this newsletter. 📡");
    } else {
        return sendReply(client, m, "Failed to subscribe to live updates. Please try again later. ❌");
    }
};
