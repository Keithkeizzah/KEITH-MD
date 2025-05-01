module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    // Extract parameters for fetching messages
    const args = m.body.split(' ').slice(1); // Assuming arguments follow the command
    const type = args[0]?.toLowerCase(); // e.g., "recent", "invite", etc.
    const key = args[1]; // Key for the messages (invite key or JID)
    const count = parseInt(args[2]) || 10; // Number of messages to fetch, default 10
    const after = args[3] || null; // Fetch messages after a certain point, optional

    // Validate the required parameters
    if (!type || !key) {
        return sendReply(client, m, "Please provide a type (recent/invite) and a key for fetching messages! 🔍");
    }

    try {
        // Fetch messages from the newsletter
        const messages = await client.newsletterFetchMessages(type, key, count, after);

        // Handle the result and provide feedback
        if (messages && messages.length > 0) {
            return sendReply(client, m, `Fetched ${messages.length} message(s) from the newsletter. ✅`);
        } else {
            return sendReply(client, m, "No messages found for the given criteria. ❌");
        }
    } catch (error) {
        // Handle errors during the operation
        return sendReply(client, m, "Failed to fetch messages from the newsletter. Please try again later. ❌");
    }
};
