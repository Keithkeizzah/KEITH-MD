module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    // Extract metadata parameters from the command arguments
    const args = m.body.split(' ').slice(1); // Assuming the arguments follow the command
    const type = args[0]?.toUpperCase(); // e.g., "DETAILS", "SUBSCRIBERS", etc.
    const key = args[1]; // The key or ID specific to the metadata
    const role = args[2] || "GUEST"; // Optional role, defaults to "GUEST"

    // Validate the required parameters
    if (!type || !key) {
        return sendReply(client, m, "Please provide both a type and a key for fetching metadata! 🔍");
    }

    try {
        // Fetch the metadata
        const metadata = await client.newsletterMetadata(type, key, role);

        // Handle the result and provide feedback
        if (metadata) {
            return sendReply(client, m, `Newsletter metadata fetched successfully: ${JSON.stringify(metadata)} ✅`);
        } else {
            return sendReply(client, m, "No metadata found for the given inputs. ❌");
        }
    } catch (error) {
        // Handle errors during metadata fetching
        return sendReply(client, m, "Failed to fetch newsletter metadata. Please try again later. ❌");
    }
};
