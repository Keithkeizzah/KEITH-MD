module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    try {
        // Fetch and display the newsletter JID
        const newsletterJid = m.chat;

        // Respond with the fetched JID
        return sendReply(client, m, `The JID for this newsletter is: ${newsletterJid} 📬`);
    } catch (error) {
        // Handle errors
        console.error("Error fetching newsletter JID:", error);
        return sendReply(client, m, "Failed to fetch the newsletter JID. Please try again later. ❌");
    }
};
