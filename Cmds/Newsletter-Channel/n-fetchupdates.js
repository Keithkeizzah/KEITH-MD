module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    // Extract parameters for fetching updates
    const args = m.body.split(' ').slice(1); // Assuming arguments follow the command
    const count = parseInt(args[0]) || 10; // Number of updates to fetch, default is 10
    const after = args[1] || null; // Optional: Fetch updates after a specific message ID
    const since = args[2] || null; // Optional: Fetch updates since a specific time or event

    try {
        // Fetch updates from the newsletter
        const updates = await client.newsletterFetchUpdates(m.chat, count, after, since);

        // Handle the result and provide feedback
        if (updates && updates.length > 0) {
            return sendReply(client, m, `Fetched ${updates.length} update(s) from the newsletter. ✅`);
        } else {
            return sendReply(client, m, "No updates found for the given criteria. ❌");
        }
    } catch (error) {
        // Handle errors during the operation
        return sendReply(client, m, "Failed to fetch updates from the newsletter. Please try again later. ❌");
    }
};
