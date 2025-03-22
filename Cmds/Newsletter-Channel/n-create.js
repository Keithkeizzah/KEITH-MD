module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Extract the name and description from the message or command arguments
    const args = m.body.split(' ').slice(1); // Assuming arguments follow the command
    const name = args[0];
    const description = args.slice(1).join(' ');

    // Validate the name and description
    if (!name || !description) {
        return sendReply(client, m, "Please provide both a name and a description for the newsletter! ✏️");
    }

    try {
        // Create the newsletter
        const result = await client.newsletterCreate(name, description);

        // Confirmation message with extracted metadata
        return sendReply(client, m, `Newsletter "${name}" has been created successfully! 📩\nDetails: ${JSON.stringify(result)}`);
    } catch (error) {
        // Handle any errors during creation
        return sendReply(client, m, "Failed to create the newsletter. Please try again later. ❌");
    }
};
