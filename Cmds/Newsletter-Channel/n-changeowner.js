module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    // Validate the provided user JID
    const args = m.body.split(' ').slice(1); // Assuming the user JID follows the command
    const newOwner = args[0];

    if (!newOwner || !newOwner.includes('@')) {
        return sendReply(client, m, "Please provide a valid user JID to set as the new owner! 🛠️");
    }

    try {
        // Execute the owner change
        await client.newsletterChangeOwner(m.chat, newOwner);

        // Confirmation message
        return sendReply(client, m, `The ownership of this newsletter has been transferred to ${newOwner}. ✅`);
    } catch (error) {
        // Handle errors during the owner change
        return sendReply(client, m, "Failed to change the owner. Please check the details and try again. ❌");
    }
};
