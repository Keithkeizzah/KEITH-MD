module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    try {
        // Delete the newsletter
        await client.newsletterDelete(m.chat);

        // Confirmation message
        return sendReply(client, m, "The newsletter has been deleted successfully. 🗑️");
    } catch (error) {
        // Handle errors during deletion
        return sendReply(client, m, "Failed to delete the newsletter. Please try again later. ❌");
    }
};
