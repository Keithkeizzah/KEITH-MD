module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    // Extract the type of action from the message or command arguments
    const args = m.body.split(' ').slice(1); // Assuming the type follows the command
    const actionType = args[0]?.toUpperCase();

    // Validate the action type
    if (!actionType || !["FOLLOW", "UNFOLLOW", "MUTE", "UNMUTE"].includes(actionType)) {
        return sendReply(client, m, "Please provide a valid action type (FOLLOW, UNFOLLOW, MUTE, UNMUTE)! ⚙️");
    }

    try {
        // Execute the newsletter action
        await client.newsletterAction(m.chat, actionType);

        // Confirmation message
        return sendReply(client, m, `Newsletter action '${actionType}' has been executed successfully! ✅`);
    } catch (error) {
        // Handle errors during execution
        return sendReply(client, m, `Failed to execute newsletter action '${actionType}'. Please try again later. ❌`);
    }
};
