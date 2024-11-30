 module.exports = async (client, m, store, chatUpdate, antidelete) => {
    if (m.mtype == 'protocolMessage' && antidelete === 'true') {
        if (m.fromMe) return;

const mokaya = chatUpdate.messages[0].message.protocolMessage

if (store.messages && store.messages[m.chat] && store.messages[m.chat].array) {

const chats = store.messages[m.chat].array.find(a => a.id === mokaya.key.id);

chats.msg.contextInfo = { mentionedJid: [chats.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: 'Deleted Message'}, ...chats.key }

await client.relayMessage(m.chat, { [chats.type]: chats.msg }, {})
				}
			}
		}
}
