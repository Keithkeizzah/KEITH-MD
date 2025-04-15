module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    // Extract the new name from the message or command arguments
    const args = m.body.split(' ').slice(1); // Assuming the new name follows the command
    const newName = args.join(' ');

    // Validate the new name
    if (!newName) {
        return sendReply(client, m, "Please provide a new name for this newsletter! ✏️");
    }

    // Update the newsletter name
    await client.newsletterUpdateName(m.chat, newName);

    // Confirmation message
    return sendReply(client, m, `The newsletter name has been updated to: "${newName}" ✅`);
};
