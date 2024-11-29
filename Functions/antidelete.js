module.exports = async (client, m, store, chatUpdate, antidelete) => {
    // Check if the message is a protocol message (i.e., deleted message indicator)
    if (m.mtype === 'protocolMessage' && antidelete === 'true') {
        if (m.fromMe) return; // Ignore if the message was sent by the bot itself

        const mokaya = chatUpdate.messages[0].message.protocolMessage; // Get the protocol message

        // Check if the store has messages and the specific chat
        if (store.messages && store.messages[m.chat] && store.messages[m.chat].array) {
            const chat = store.messages[m.chat].array.find(a => a.id === mokaya.key.id); // Find the deleted message in the store

            if (chat) {
                // Modify the context of the deleted message
                chat.msg.contextInfo = {
                    mentionedJid: [chat.key.participant],
                    isForwarded: true,
                    forwardingScore: 1,
                    quotedMessage: { conversation: 'Deleted Message' },
                    ...chat.key
                };

                // Prepare the message to be relayed based on its type
                const messageToRelay = { [chat.type]: chat.msg };

                // Relay the message back to the chat
                await client.relayMessage(m.chat, messageToRelay, {});
            }
        }
    }
};
