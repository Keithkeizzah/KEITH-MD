const {
  default: keithConnect,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  downloadContentFromMessage,
  jidDecode,
  proto,
  getContentType
} = require("@whiskeysockets/baileys");

function smsg(keithInstance, message, store) {
  if (!message) {
    return message;
  }

  let messageInfo = proto.WebMessageInfo;

  // Initialize message properties
  if (message.key) {
    message.id = message.key.id;
    message.isBaileys = message.id.startsWith("BAE5") && message.id.length === 16;
    message.chat = message.key.remoteJid;
    message.fromMe = message.key.fromMe;
    message.isGroup = message.chat.endsWith("@g.us");
    message.sender = keithInstance.decodeJid(
      message.fromMe && keithInstance.user.id || message.participant || message.key.participant || message.chat || ''
    );
    
    if (message.isGroup) {
      message.participant = keithInstance.decodeJid(message.key.participant) || '';
    }
  }

  // Process the message content
  if (message.message) {
    message.mtype = getContentType(message.message);

    // Handle specific types of messages (e.g., viewOnce)
    message.msg = message.mtype === "viewOnceMessage" 
      ? message.message[message.mtype] ? message.message[message.mtype].message[getContentType(message.message[message.mtype].message)] : undefined
      : message.message[message.mtype];
    
    // Extract body from different message types
    message.body = message.message.conversation ||
                   (message.msg && message.msg.caption) ||
                   (message.msg && message.msg.text) ||
                   (message.mtype === "listResponseMessage" && message.msg && message.msg.singleSelectReply && message.msg.singleSelectReply.selectedRowId) ||
                   (message.mtype === "buttonsResponseMessage" && message.msg && message.msg.selectedButtonId) ||
                   (message.mtype === "viewOnceMessage" && message.msg && message.msg.caption) ||
                   message.text;

    let quotedMessage = message.quoted = message.msg.contextInfo ? message.msg.contextInfo.quotedMessage : null;
    message.mentionedJid = message.msg.contextInfo ? message.msg.contextInfo.mentionedJid : [];

    // Handle quoted messages
    if (quotedMessage) {
      let contentType = getContentType(quotedMessage);
      message.quoted = quotedMessage[contentType];

      if (["productMessage"].includes(contentType)) {
        contentType = getContentType(message.quoted);
        message.quoted = message.quoted[contentType];
      }

      if (typeof message.quoted === "string") {
        message.quoted = { 'text': message.quoted };
      }

      message.quoted.mtype = contentType;
      message.quoted.id = message.msg.contextInfo.stanzaId;
      message.quoted.chat = message.msg.contextInfo.remoteJid || message.chat;
      message.quoted.isBaileys = message.quoted.id ? message.quoted.id.startsWith("BAE5") && message.quoted.id.length === 16 : false;
      message.quoted.sender = keithInstance.decodeJid(message.msg.contextInfo.participant);
      message.quoted.fromMe = message.quoted.sender === keithInstance.decodeJid(keithInstance.user.id);
      message.quoted.text = message.quoted.text || message.quoted.caption || message.quoted.conversation || message.quoted.contentText || message.quoted.selectedDisplayText || message.quoted.title || '';
      message.quoted.mentionedJid = message.msg.contextInfo ? message.msg.contextInfo.mentionedJid : [];

      // Helper function to fetch quoted message
      message.quoted.getQuotedObj = message.quoted.getQuotedMessage = async () => {
        if (!message.quoted.id) {
          return false;
        }
        let quotedMsg = await store.loadMessage(message.chat, message.quoted.id, keithInstance);
        return exports.smsg(keithInstance, quotedMsg, store);
      };

      let quotedMessageFakeObj = message.quoted.fakeObj = messageInfo.fromObject({
        'key': {
          'remoteJid': message.quoted.chat,
          'fromMe': message.quoted.fromMe,
          'id': message.quoted.id
        },
        'message': quotedMessage,
        ...message.isGroup ? { 'participant': message.quoted.sender } : {}
      });

      // Helper functions for deleting and forwarding quoted messages
      message.quoted["delete"] = () => keithInstance.sendMessage(message.quoted.chat, { 'delete': quotedMessageFakeObj.key });
      message.quoted.copyNForward = (toChat, forceForward = false, options = {}) => keithInstance.copyNForward(toChat, quotedMessageFakeObj, forceForward, options);
      message.quoted.download = () => keithInstance.downloadMediaMessage(message.quoted);
    }
  }

  // Handle URL in the message
  if (message.msg.url) {
    message.download = () => keithInstance.downloadMediaMessage(message.msg);
  }

  // Extract main text content from the message
  message.text = message.msg.text || message.msg.caption || message.message.conversation || message.msg.contentText || message.msg.selectedDisplayText || message.msg.title || '';

  // Reply function
  message.reply = (replyText, replyTo = message.chat, options = {}) => {
    if (Buffer.isBuffer(replyText)) {
      return keithInstance.sendMedia(replyTo, replyText, "file", '', message, { ...options });
    }
    return keithInstance.sendText(replyTo, replyText, message, { ...options });
  };

  // Function to copy the message
  message.copy = () => exports.smsg(keithInstance, messageInfo.fromObject(messageInfo.toObject(message)));

  // Function to forward the message
  message.copyNForward = (toChat = message.chat, forceForward = false, options = {}) => keithInstance.copyNForward(toChat, message, forceForward, options);

  return message;
}

module.exports = {
  smsg
};
