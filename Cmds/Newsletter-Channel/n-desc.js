module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    // Extract the new description from the message or command arguments
    const args = m.body.split(' ').slice(1); // Assuming the description follows the command
    const newDescription = args.join(' ');

    // Validate the description
    if (!newDescription) {
        return sendReply(client, m, "Please provide a new description for this newsletter! ✏️");
    }

    // Update the newsletter description
    await client.newsletterUpdateDescription(m.chat, newDescription);

    // Confirmation message
    return sendReply(client, m, `The newsletter description has been updated to: "${newDescription}" ✅`);
};
