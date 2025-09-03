const { proto, getContentType } = require("@whiskeysockets/baileys");

function smsg(keithInstance, message, store) {
  if (!message) return message;


  if (message.key) {
    message.id = message.key.id;
    message.isBaileys = message.id && message.id.startsWith("BAE5") && message.id.length === 16;
    message.chat = message.key.remoteJid;
    message.fromMe = message.key.fromMe;
    message.isGroup = message.chat && message.chat.endsWith("@g.us");
    message.sender = message.fromMe ? 
      keithInstance.user.id : 
      (message.key.participant || message.key.remoteJid || '');
    
    if (message.isGroup) {
      message.participant = message.key.participant || '';
    }
  }

  
  if (message.message) {
    message.mtype = getContentType(message.message);

  
    if (message.mtype === "viewOnceMessage") {
      const viewOnceContent = message.message[message.mtype];
      if (viewOnceContent && viewOnceContent.message) {
        message.msg = viewOnceContent.message[getContentType(viewOnceContent.message)];
      }
    } else {
      message.msg = message.message[message.mtype];
    }

    
    message.body = message.message.conversation ||
                   (message.msg && (message.msg.caption || message.msg.text)) ||
                   (message.mtype === "listResponseMessage" && message.msg && message.msg.singleSelectReply && message.msg.singleSelectReply.selectedRowId) ||
                   (message.mtype === "buttonsResponseMessage" && message.msg && message.msg.selectedButtonId) ||
                   (message.mtype === "templateButtonReplyMessage" && message.msg && message.msg.selectedId) ||
                   "";

    
    const contextInfo = message.msg && message.msg.contextInfo;
    message.quoted = contextInfo ? contextInfo.quotedMessage : null;
    message.mentionedJid = contextInfo ? contextInfo.mentionedJid || [] : [];

    if (message.quoted) {
      let quotedContentType = getContentType(message.quoted);
      message.quotedMsg = message.quoted[quotedContentType];

      
      if (["productMessage", "viewOnceMessage"].includes(quotedContentType)) {
        const nestedContent = message.quotedMsg[getContentType(message.quotedMsg)];
        if (nestedContent) {
          message.quotedMsg = nestedContent;
          quotedContentType = getContentType(nestedContent);
        }
      }

      if (typeof message.quotedMsg === "string") {
        message.quotedMsg = { text: message.quotedMsg };
      }

      message.quoted.mtype = quotedContentType;
      message.quoted.id = contextInfo.stanzaId;
      message.quoted.chat = contextInfo.remoteJid || message.chat;
      message.quoted.isBaileys = message.quoted.id ? 
        message.quoted.id.startsWith("BAE5") && message.quoted.id.length === 16 : false;
      message.quoted.sender = contextInfo.participant;
      message.quoted.fromMe = message.quoted.sender === keithInstance.user.id;
      message.quoted.text = message.quotedMsg.text || 
                           message.quotedMsg.caption || 
                           message.quotedMsg.conversation || 
                           message.quotedMsg.contentText || 
                           message.quotedMsg.selectedDisplayText || 
                           message.quotedMsg.title || 
                           '';

      
      message.quoted.getQuotedObj = message.quoted.getQuotedMessage = async () => {
        if (!message.quoted.id || !store) return null;
        try {
          const quotedMsg = await store.loadMessage(message.quoted.chat, message.quoted.id);
          return smsg(keithInstance, quotedMsg, store);
        } catch (error) {
          return null;
        }
      };

      
      const quotedMessageFakeObj = proto.WebMessageInfo.fromObject({
        key: {
          remoteJid: message.quoted.chat,
          fromMe: message.quoted.fromMe,
          id: message.quoted.id
        },
        message: message.quoted,
        ...(message.isGroup && { participant: message.quoted.sender })
      });

    
      message.quoted.delete = () => {
        return keithInstance.sendMessage(message.quoted.chat, { delete: quotedMessageFakeObj.key });
      };

      message.quoted.forward = (to, options = {}) => {
        return keithInstance.sendMessage(to, { forward: quotedMessageFakeObj }, options);
      };

      message.quoted.copy = () => {
        return smsg(keithInstance, proto.WebMessageInfo.fromObject(proto.WebMessageInfo.toObject(quotedMessageFakeObj)), store);
      };

      message.quoted.download = () => {
        return keithInstance.downloadMediaMessage(message.quoted);
      };
    }
  }

  
  if (message.msg && message.msg.url) {
    message.download = () => keithInstance.downloadMediaMessage(message);
  }

  
  message.text = message.msg && (message.msg.text || 
                message.msg.caption || 
                message.msg.contentText) || 
                message.message.conversation || 
                message.body || 
                '';

  
  message.reply = (text, options = {}) => {
    if (Buffer.isBuffer(text)) {
      return keithInstance.sendMessage(message.chat, 
        { document: text, mimetype: options.mimetype || 'application/octet-stream', fileName: options.filename || 'file' }, 
        { quoted: message, ...options }
      );
    }
    return keithInstance.sendMessage(message.chat, { text }, { quoted: message, ...options });
  };

  
  message.copy = () => {
    return smsg(keithInstance, proto.WebMessageInfo.fromObject(proto.WebMessageInfo.toObject(message)), store);
  };

  
  message.forward = (to, options = {}) => {
    return keithInstance.sendMessage(to, { forward: message }, options);
  };

  return message;
}

module.exports = { smsg };
