module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    // Extract the mode from the command arguments
    const args = m.body.split(' ').slice(1); // Assuming the mode follows the command
    const mode = args[0];

    // Validate the mode
    if (!mode || !["enabled", "disabled"].includes(mode.toLowerCase())) {
        return sendReply(client, m, "Please provide a valid reaction mode: 'enabled' or 'disabled'! ⚙️");
    }

    try {
        // Update the reaction mode for the newsletter
        await client.newsletterReactionMode(m.chat, mode.toLowerCase());

        // Confirmation message
        return sendReply(client, m, `Reaction mode has been successfully set to '${mode}'. ✅`);
    } catch (error) {
        // Handle errors during the update
        console.error("Error updating reaction mode:", error);
        return sendReply(client, m, "Failed to update the reaction mode. Please try again later. ❌");
    }
};
