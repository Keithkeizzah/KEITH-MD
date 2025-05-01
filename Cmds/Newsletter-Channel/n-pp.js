module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    // Extract the image URL from the message or command arguments
    const args = m.body.split(' ').slice(1); // Assuming the URL follows the command
    const imageUrl = args[0];

    // Validate the image URL
    if (!imageUrl || !imageUrl.startsWith('http')) {
        return sendReply(client, m, "Please provide a valid image URL to set as the newsletter picture! 🌐");
    }

    try {
        // Fetch the image content from the URL
        const response = await fetch(imageUrl);
        const content = await response.buffer();

        // Generate profile picture and update the newsletter picture
        const { img } = await Utils_1.generateProfilePicture(content);
        await client.newsletterUpdatePicture(m.chat, img);

        // Confirmation message
        return sendReply(client, m, "The newsletter picture has been updated successfully! ✅");
    } catch (error) {
        // Handle errors (e.g., invalid URL, fetch issues)
        return sendReply(client, m, "Failed to fetch or update the newsletter picture. Please check the URL and try again. ❌");
    }
};
