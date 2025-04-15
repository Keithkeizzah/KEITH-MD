module.exports = async (context) => {
    const { client, m, sendReply } = context;

    if (!m.mentionedJid || m.mentionedJid.length === 0) {
        return sendReply(client, m, "You did not give me a user!?");
    }

    // Extract the first mentioned JID
    let user = m.mentionedJid[0];
    const parts = user.split('@')[0];

    // Check if the user is the bot owner
    if (user == "254796299159@s.whatsapp.net") {
        return sendReply(client, m, "It's Owner Number! 🦄");
    }

    // Use newsletterDemote for newsletters
    if (m.chat?.endsWith('@newsletter')) {
        await client.newsletterDemote(m.chat, user);
        return sendReply(client, m, `${parts} is no longer an admin of this newsletter. 🎗️`);
    }

    // If not a newsletter, fallback response
    return sendReply(client, m, "This command works only in newsletters. ❗");
};
