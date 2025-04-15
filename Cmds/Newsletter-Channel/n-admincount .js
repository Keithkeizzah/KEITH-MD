module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    try {
        // Fetch the admin count
        const adminCount = await client.newsletterAdminCount(m.chat);

        // Confirmation message with the admin count
        return sendReply(client, m, `This newsletter has ${adminCount} admin(s). 🛡️`);
    } catch (error) {
        // Handle errors during the retrieval
        return sendReply(client, m, "Failed to fetch the admin count. Please try again later. ❌");
    }
};
