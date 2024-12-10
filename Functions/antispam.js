// Track messages by user
const messageCounts = {};

module.exports = async (client, m, isBotAdmin, itsMe, isAdmin, Owner, body, antispam) => {
    // Skip if the message is from the bot itself
    if (itsMe) return;

    // Define spam detection settings
    const spamThreshold = 5;  // Max messages allowed in the time window
    const timeWindow = 10000; // Time window in milliseconds (e.g., 10 seconds)

    // Get the sender's ID
    const senderId = m.sender;

    // Check if the message is a private message (not from a group) and anti-spam is enabled
    if (m.isGroup === false && antispam === 'true') {
        // Initialize or update the message count for the sender
        if (!messageCounts[senderId]) {
            messageCounts[senderId] = {
                count: 0,
                lastMessageTime: Date.now()
            };
        }

        // Calculate the time difference from the last message
        const timeDiff = Date.now() - messageCounts[senderId].lastMessageTime;

        // If the time window has passed, reset the count
        if (timeDiff > timeWindow) {
            messageCounts[senderId] = {
                count: 1,
                lastMessageTime: Date.now()
            };
        } else {
            // Increment message count and update the last message time
            messageCounts[senderId].count++;
            messageCounts[senderId].lastMessageTime = Date.now();
        }

        // Check if the sender exceeds the spam threshold
        if (messageCounts[senderId].count > spamThreshold) {
            try {
                // Block the user immediately
                await client.updateBlockStatus(senderId, 'block');

                // Optionally, send a message explaining the block
                await client.sendMessage(m.chat, {
                    text: `User @${senderId.split('@')[0]} has been blocked due to spamming.`,
                    contextInfo: { mentionedJid: [senderId] }
                }, { quoted: m });

                // Clear the message count for the user after blocking them
                delete messageCounts[senderId];
            } catch (error) {
                console.error('Error blocking user:', error);
            }
        }
    }
};
