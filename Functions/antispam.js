const messageCounts = {};

module.exports = async (client, m, isBotAdmin, itsMe, isAdmin, Owner, body, antispam) => {
    // Skip if the message is from the bot itself
    if (itsMe) return;

    // Define spam detection settings
    const spamThreshold = 10;  // Max messages allowed without a response
    const timeWindow = 10000;  // Time window in milliseconds (e.g., 10 seconds)
    
    // Get the sender's ID
    const senderId = m.sender;

    // Check if the message is a private message (not from a group) and anti-spam is enabled
    if (m.isGroup === false && antispam === 'true') {
        // Initialize or update the message count for the sender
        if (!messageCounts[senderId]) {
            messageCounts[senderId] = {
                count: 0,
                lastMessageTime: Date.now(),
                lastResponseTime: Date.now() // Track last response time from the bot
            };
        }

        // Check if the sender has sent more than the allowed messages without a bot response
        if (Date.now() - messageCounts[senderId].lastResponseTime > timeWindow) {
            // Reset message count if the time window has passed without bot response
            messageCounts[senderId].count = 0;
        }

        // Increment message count
        messageCounts[senderId].count++;

        // Update the time of the last message from the sender
        messageCounts[senderId].lastMessageTime = Date.now();

        // Check if the sender exceeds the spam threshold
        if (messageCounts[senderId].count > spamThreshold) {
            // Block the user immediately
            await client.updateBlockStatus(senderId, 'block');

            // Optionally, send a message explaining the block
            await client.sendMessage(m.chat, {
                text: `User @${senderId.split('@')[0]} has been blocked due to spamming.`,
                contextInfo: { mentionedJid: [senderId] }
            }, { quoted: m });

            // Clear the message count for the user after blocking them
            delete messageCounts[senderId];
        }
    }
};
