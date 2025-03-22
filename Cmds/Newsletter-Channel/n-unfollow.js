module.exports = async (context) => {
    const { client, m, sendReply } = context;

    // Check if the chat is a newsletter
    if (!m.chat?.endsWith('@newsletter')) {
        return sendReply(client, m, "This command only works in newsletters! ❗");
    }

    // Unfollow the newsletter
    await client.newsletterUnfollow(m.chat);

    // Confirmation message
    return sendReply(client, m, "You have successfully unfollowed this newsletter. ❌");
};
