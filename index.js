
/*Why does my code work? I don’t know. Why does my code break? I also don’t know.*/

const fs = require('fs');
const zlib = require('zlib');
const { session } = require("./settings");


async function authenticationn() {
  try {
    const credsPath = "./session/creds.json";

   
    if (!fs.existsSync(credsPath)) {
      console.log("Connecting...");

      
      const [header, b64data] = session.split(';;;');

      
      if (header === "KEITH" && b64data) {
        
        let compressedData = Buffer.from(b64data.replace('...', ''), 'base64');

       
        let decompressedData = zlib.gunzipSync(compressedData);

       
        fs.writeFileSync(credsPath, decompressedData, "utf8");
      } else {
        throw new Error("Invalid session format");
      }
    }
    
    else if (session !== "zokk") {
      console.log("Updating existing session...");

    
      const [header, b64data] = session.split(';;;');

      
      if (header === "KEITH" && b64data) {
        
        let compressedData = Buffer.from(b64data.replace('...', ''), 'base64');

       
        let decompressedData = zlib.gunzipSync(compressedData);

       
        fs.writeFileSync(credsPath, decompressedData, "utf8");
      } else {
        throw new Error("Invalid session format");
      }
    }
  } catch (error) {
    console.log("Session is invalid: " + error.message);
    return;
  }
}


authenticationn();

//Why do we call it "open source" when it feels more like "open wounds"?🗿🗿

//Because sharing is caring... and crying is healing🗿🗿



const {
  default: KeithConnect, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent,
  generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, useMultiFileAuthState,
  DisconnectReason, makeInMemoryStore, downloadContentFromMessage, jidDecode
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const { Boom } = require("@hapi/boom");
//const fs = require("fs");
const FileType = require("file-type");
const { exec } = require("child_process");
const chalk = require("chalk");
const express = require("express");
//const textToSpeech = require('@google-cloud/text-to-speech');
const { DateTime } = require("luxon");
const util = require("util");
const speed = require("performance-now");
const { smsg } = require('./lib/smsg');
const fetchLogoUrl = require('./lib/ephoto');
const {
  smsgsmsg, formatp, tanggal, formatDate, getTime, sleep, clockString,
  fetchJson, getBuffer, jsonformat, antispam, generateProfilePicture, parseMention,
  getRandom, fetchBuffer,
} = require("./lib/botFunctions.js");

const { TelegraPh, UploadFileUgu } = require("./lib/toUrl");
const uploadtoimgur = require("./lib/Imgur");

const { sendReply, sendMediaMessage } = require("./lib/context");

const { downloadYouTube, downloadSoundCloud, downloadSpotify, searchYouTube, searchSoundCloud, searchSpotify } = require("./lib/dl");
const ytmp3 = require("./lib/ytmp3");
const path = require("path");
const { commands, totalCommands } = require("./commandHandler");

const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require("./lib/exif");
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });
const daddy = "254748387615@s.whatsapp.net";

const {
  autoview, autostatusreply, autostatusmsg, permit, autoread, botname, chatbot, timezone, autobio, mode, anticallmsg, reactemoji, prefix, presence,
  mycode, author, antibad, autodownloadstatus, packname, url, voicechatbot2, gurl, herokuAppname, greet, greetmsg, herokuapikey, anticall, dev, antilink, gcpresence, antibot, antitag, antidelete, autolike, voicechatbot
} = require("./settings");

const groupEvents = require("./groupEvents.js");
const axios = require("axios"); // Added axios import
const googleTTS = require('google-tts-api'); // Added Google TTS import



const app = express();
const port = process.env.PORT || 10000;

// Anti-delete functionality
const baseDir = 'message_data';
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

function loadChatData(remoteJid, messageId) {
  const chatFilePath = path.join(baseDir, remoteJid, `${messageId}.json`);
  try {
    const data = fs.readFileSync(chatFilePath, 'utf8');
    return JSON.parse(data) || [];
  } catch (error) {
    return [];
  }
}

function saveChatData(remoteJid, messageId, chatData) {
  const chatDir = path.join(baseDir, remoteJid);

  if (!fs.existsSync(chatDir)) {
    fs.mkdirSync(chatDir, { recursive: true });
  }

  const chatFilePath = path.join(chatDir, `${messageId}.json`);

  try {
    fs.writeFileSync(chatFilePath, JSON.stringify(chatData, null, 2));
  } catch (error) {
    console.error('Error saving chat data:', error);
  }
}

function handleIncomingMessage(message) {
  const remoteJid = message.key.remoteJid;
  const messageId = message.key.id;

  const chatData = loadChatData(remoteJid, messageId);
  chatData.push(message);
  saveChatData(remoteJid, messageId, chatData);
}

async function handleMessageRevocation(client, revocationMessage) {
  const remoteJid = revocationMessage.key.remoteJid;
  const messageId = revocationMessage.message.protocolMessage.key.id;

  const chatData = loadChatData(remoteJid, messageId);
  const originalMessage = chatData[0];

  if (originalMessage) {
    const deletedBy = revocationMessage.participant || revocationMessage.key.participant || revocationMessage.key.remoteJid;
    const sentBy = originalMessage.key.participant || originalMessage.key.remoteJid;

    if (deletedBy.includes(client.user.id.split('@')[0]) || sentBy.includes(client.user.id.split('@')[0])) return;

    const delfrom = process.env.DELETEMSGSENDTO ? `${process.env.DELETEMSGSENDTO}@s.whatsapp.net` : remoteJid;

    const deletedByFormatted = `@${deletedBy.split('@')[0]}`;
    const sentByFormatted = `@${sentBy.split('@')[0]}`;

    let notificationText = `*😈 Keith MD Anti-Delete 😈*\n\n` +
      `   *Deleted by:* ${deletedByFormatted}\n` +
      `   *Sent by:* ${sentByFormatted}\n\n`;

    if (originalMessage.message?.conversation) {
      // Text message
      const messageText = originalMessage.message.conversation;
      notificationText += `   *Message Text:* \`\`\`${messageText}\`\`\``;
      await client.sendMessage(delfrom, { text: notificationText });
    } else if (originalMessage.message?.imageMessage) {
      // Image message
      const buffer = await client.downloadMediaMessage(originalMessage);
      await client.sendMessage(delfrom, { image: buffer });
      await client.sendMessage(delfrom, { text: notificationText });
    } else if (originalMessage.message?.videoMessage) {
      // Video message
      const buffer = await client.downloadMediaMessage(originalMessage);
      await client.sendMessage(delfrom, { video: buffer });
      await client.sendMessage(delfrom, { text: notificationText });
    } else if (originalMessage.message?.stickerMessage) {
      // Sticker message
      const buffer = await client.downloadMediaMessage(originalMessage);
      await client.sendMessage(delfrom, { sticker: buffer });
      await client.sendMessage(delfrom, { text: notificationText });
    } else if (originalMessage.message?.documentMessage) {
      // Document message
      const fileName = originalMessage.message.documentMessage.fileName || 'file';
      const buffer = await client.downloadMediaMessage(originalMessage);
      await client.sendMessage(delfrom, { document: buffer, fileName: fileName });
      await client.sendMessage(delfrom, { text: notificationText });
    } else if (originalMessage.message?.audioMessage) {
      // Audio message (including PTT)
      const buffer = await client.downloadMediaMessage(originalMessage);
      const isPTT = originalMessage.message.audioMessage.ptt === true;
      await client.sendMessage(delfrom, { audio: buffer, ptt: isPTT, mimetype: 'audio/mpeg', fileName: `${messageId}.mp3` });
      await client.sendMessage(delfrom, { text: notificationText });
    } else if (originalMessage.message?.extendedTextMessage) {
      // Extended text message (quoted messages)
      const messageText = originalMessage.message.extendedTextMessage.text;
      notificationText += `   *Message Text:* \`\`\`${messageText}\`\`\``;
      await client.sendMessage(delfrom, { text: notificationText });
    }
  }
}
let repliedContacts = new Set();
async function startKeith() {
  const { saveCreds, state } = await useMultiFileAuthState("session");
  const client = KeithConnect({
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    version: [2, 3000, 1015901307],
    browser: ["KEITH-MD", "Safari", "3.0"],
    fireInitQueries: false,
    shouldSyncHistoryMessage: true,
    downloadHistory: true,
    syncFullHistory: true,
    generateHighQualityLinkPreview: true,
    markOnlineOnConnect: true,
    keepAliveIntervalMs: 30000,
    auth: state,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg.message || undefined;
      }
      return { conversation: "HERE" };
    },
  });

  store.bind(client.ev);

  if (autobio === "true") {
    setInterval(() => {
      const date = new Date();
      client.updateProfileStatus(
        `${botname} is active 24/7\n\n${date.toLocaleString("en-US", { timeZone: "Africa/Nairobi" })} It's a ${date.toLocaleString("en-US", { weekday: "long", timeZone: "Africa/Nairobi" })}.`
      );
    }, 10 * 1000);
  }

  let lastTextTime = 0;
  const messageDelay = 5000;

  client.ev.on('call', async (callData) => {
    if (anticall === 'true') {
      const callId = callData[0].id;
      const callerId = callData[0].from;

      await client.rejectCall(callId, callerId);

      const currentTime = Date.now();
      if (currentTime - lastTextTime >= messageDelay) {
        await client.sendMessage(callerId, {
          text: anticallmsg
        });
        lastTextTime = currentTime;
      } else {
        console.log('Message skipped to prevent overflow');
      }
    }
  });

  client.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      const mek = chatUpdate.messages[0];
      if (!mek.message) return;
      mek.message = mek.message.ephemeralMessage?.message || mek.message;
      const idBot = client.decodeJid(client.user.id);
      if (mek.key && mek.key.remoteJid === 'status@broadcast' && autodownloadstatus === "true") {
        if (mek.message.extendedTextMessage) {
          const stTxt = mek.message.extendedTextMessage.text;
          await client.sendMessage(idBot, { text: stTxt }, { quoted: mek });
        } else if (mek.message.imageMessage) {
          const stMsg = mek.message.imageMessage.caption;
          const stImg = await client.downloadAndSaveMediaMessage(mek.message.imageMessage);
          await client.sendMessage(idBot, { image: { url: stImg }, caption: stMsg }, { quoted: mek });
        } else if (mek.message.videoMessage) {
          const stMsg = mek.message.videoMessage.caption;
          const stVideo = await client.downloadAndSaveMediaMessage(mek.message.videoMessage);
          await client.sendMessage(idBot, {
            video: { url: stVideo }, caption: stMsg
          }, { quoted: mek });
        }
      }
      if (autoview === 'true' && autolike === 'true' && mek.key && mek.key.remoteJid === "status@broadcast") {
        const keithlike = await client.decodeJid(client.user.id);
        const emojis = ['😂', '😥', '😇', '🥹', '💥', '💯', '🔥', '💫', '👽', '💗', '❤️‍🔥', '👁️', '👀', '🙌', '🙆', '🌟', '💧', '🎇', '🎆', '♂️', '✅'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const delayMessage = 3000;
        await client.sendMessage(mek.key.remoteJid, {
          react: {
            text: randomEmoji,
            key: mek.key,
          }
        }, { statusJidList: [mek.key.participant, keithlike] });
        await sleep(delayMessage);
      }
  

      

      if (autoview === "true" && mek.key?.remoteJid === "status@broadcast") {
        await client.readMessages([mek.key]);
      } else if (autoread === "true" && mek.key?.remoteJid.endsWith("@s.whatsapp.net")) {
        await client.readMessages([mek.key]);
      }

      if (mek.key?.remoteJid.endsWith("@s.whatsapp.net")) {
        const presenceType = presence === "online" ? "available" : presence === "typing" ? "composing" : presence === "recording" ? "recording" : "unavailable";
        await client.sendPresenceUpdate(presenceType, mek.key.remoteJid);
      }

      if (!client.public && !mek.key.fromMe && chatUpdate.type === "notify") return;

      const m = smsg(client, mek, store);

      const body = m.mtype === "conversation" ? m.message.conversation :
        m.mtype === "imageMessage" ? m.message.imageMessage.caption :
          m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text : "";

      const cmd = body.startsWith(prefix);
      const args = body.trim().split(/ +/).slice(1);
      const pushname = m.pushName || "No Name";
      const botNumber = await client.decodeJid(client.user.id);
      const servBot = botNumber.split('@')[0];
      const Ghost = "254796299158"; 
      const Ghost2 = "254110190196";
      const Ghost3 = "2547483876159";
      const Ghost4 = "254743995989";
      const superUserNumbers = [servBot, Ghost, Ghost2, Ghost3, Ghost4, dev].map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
      const isOwner = superUserNumbers.includes(m.sender); 
      const isBotMessage = m.sender === botNumber;  
      const itsMe = m.sender === botNumber;
      const text = args.join(" ");
      const Tag = m.mtype === "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null
        ? m.message.extendedTextMessage.contextInfo.mentionedJid
        : [];

      let msgKeith = m.message.extendedTextMessage?.contextInfo?.quotedMessage;
      let budy = typeof m.text === "string" ? m.text : "";

      const timestamp = speed();
      const Keithspeed = speed() - timestamp;

      const getGroupAdmins = (participants) => {
        let admins = [];
        for (let i of participants) {
          if (i.admin === "superadmin") admins.push(i.id);
          if (i.admin === "admin") admins.push(i.id);
        }
        return admins || [];
      };

      const keizzah = m.quoted || m;
      const quoted = keizzah.mtype === 'buttonsMessage' ? keizzah[Object.keys(keizzah)[1]] :
        keizzah.mtype === 'templateMessage' ? keizzah.hydratedTemplate[Object.keys(keizzah.hydratedTemplate)[1]] :
          keizzah.mtype === 'product' ? keizzah[Object.keys(keizzah)[0]] : m.quoted ? m.quoted : m;

      const color = (text, color) => {
        return color ? chalk.keyword(color)(text) : chalk.green(text);
      };

      const mime = quoted.mimetype || "";
      const qmsg = quoted;
      const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(() => {}) : "";
      const newsletterMetadata = m.isNewsletter ? await client.newsletterMetadata(m.chat).catch(() => {}) : "";
      const subscribers = m.isNewsletter && newsletterMetadata ? newsletterMetadata.subscribers : [];
      const IsNewsletter = m.chat?.endsWith("@newsletter");
      const newsletterAdmins = m.isNewsletter ? getNewsletterAdmins(subscribers) : [];
      const isNewsletterBotAdmin = m.isNewsletter ? newsletterAdmins.includes(botNumber) : false;
      const isNewsletterAdmin = m.isNewsletter ? newsletterAdmins.includes(m.sender) : false;

      const groupName = m.isGroup && groupMetadata ? groupMetadata.subject : "";
      const participants = m.isGroup && groupMetadata ? groupMetadata.participants : [];
      const groupAdmin = m.isGroup ? getGroupAdmins(participants) : [];
      const isBotAdmin = m.isGroup ? groupAdmin.includes(botNumber) : false;
      const isAdmin = m.isGroup ? groupAdmin.includes(m.sender) : false;

      const IsGroup = m.chat?.endsWith("@g.us");

      // Anti-delete functionality
      if (antidelete === "true") {
        if (mek.message?.protocolMessage?.key) {
          await handleMessageRevocation(client, mek);
        } else {
          handleIncomingMessage(mek);
        }
      }
      const messageText = mek.message.conversation || mek.message.extendedTextMessage?.text || "";
      const remoteJid = mek.key.remoteJid;
      const senderJid = mek.key.participant || mek.key.remoteJid;
      const senderNumber = senderJid.split('@')[0];

      // Update the auto-reply message dynamically
      const auto_reply_message = `@${senderNumber}\n${greetmsg}`;

      // Check if the message exists and is a command to set a new auto-reply message with any prefix
      if (messageText.match(/^[^\w\s]/) && mek.key.fromMe) {
        const prefix = messageText[0]; // Detect the prefix
        const command = messageText.slice(1).split(" ")[0]; // Command after prefix
        const newMessage = messageText.slice(prefix.length + command.length).trim(); // New message content

        if (command === "setautoreply" && newMessage) {
          greetmsg = newMessage;
          await client.sendMessage(remoteJid, {
            text: `Auto-reply message has been updated to:\n"${newMessage}"`
          });
          return;
        }
      }

      // Check if auto-reply is enabled, contact hasn't received a reply, and it's a private chat
      if (greet === "true" && !repliedContacts.has(remoteJid) && !mek.key.fromMe && !remoteJid.includes("@g.us")) {
        await client.sendMessage(remoteJid, {
          text: auto_reply_message,
          mentions: [senderJid]
        });

        // Add contact to replied set to prevent repeat replies
        repliedContacts.add(remoteJid);
      }
      
         const forbiddenLinkPattern = /https?:\/\/[^\s]+/;
      if (body && forbiddenLinkPattern.test(body) && m.isGroup && antilink === 'true' && !isOwner && isBotAdmin && !isAdmin) {
        if (itsMe) return;

        const kid = m.sender;

        await client.sendMessage(m.chat, {
          text: `🚫Antilink detected🚫\n\n@${kid.split("@")[0]}, do not send links!`,
          contextInfo: { mentionedJid: [kid] }
        }, { quoted: m });

        await client.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: kid
          }
        });

        if (!isBotAdmin) {
          await client.sendMessage(m.chat, {
            text: `Please promote me to an admin to remove @${kid.split("@")[0]} for sharing link.`,
          });
        } else {
          await client.groupParticipantsUpdate(m.chat, [kid], 'remove');
        }
      }
      const forbiddenWords = [
        'kuma',
        'mafi',
        'kumbavu',
        'ngombe',
        'fala',
        'asshole',
        'cunt',
        'cock',
        'slut',
        'fag'
      ];

      if (body && forbiddenWords.some(word => body.toLowerCase().includes(word))) {
        if (m.isGroup && antibad === 'true') {
          if (isBotAdmin && !isOwner && !isAdmin) {
            const kid = m.sender;

            await client.sendMessage(m.chat, {
              text: `🚫bad word detected 🚫\n\n@${kid.split("@")[0]}, do not send offensive words!`,
              contextInfo: { mentionedJid: [kid] }
            }, { quoted: m });

            await client.sendMessage(m.chat, {
              delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: kid
              }
            });

            await client.groupParticipantsUpdate(m.chat, [kid], 'remove');
            await client.updateBlockStatus(kid, 'block');
          }
        } else if (!m.isGroup && antibad === 'true') {
          const kid = m.sender;
          await client.updateBlockStatus(kid, 'block');
        }
      }

      
      

      // Prevent chatbot from responding in groups
      if (!IsGroup && chatbot === 'true') {
        try {
          const currentTime = Date.now();
          if (currentTime - lastTextTime < messageDelay) {
            console.log('Message skipped: Too many messages in a short time.');
            return;
          }

          // Fetch chatbot response using axios
          const response = await axios.get('https://keith-api.vercel.app/ai/gpt', {
            params: {
              q: text
            }
          });

          const keith = response.data;

          if (keith && keith.status && keith.result) {
            await client.sendMessage(m.chat, {
              text: keith.result
            });
            lastTextTime = Date.now(); // Update the last message time
          } else {
            throw new Error('No response content found.');
          }
        } catch (error) {
          console.error('Error fetching chatbot response:', error);
        }
      }
      // Voice Chatbot Integration
if (!IsGroup && voicechatbot === 'true') {
  try {
    const currentTime = Date.now();
    if (currentTime - lastTextTime < messageDelay) {
      console.log('Message skipped: Too many messages in a short time for voice chatbot.');
      return;
    }

    // Fetch chatbot response using axios
    const response = await axios.get('https://keith-api.vercel.app/ai/gpt', {
      params: {
        q: text // Use the user's message as the query
      }
    });

    // Log the API response for debugging
    console.log('API Response:', response.data);

    // Check if the response is valid
    if (!response.data || !response.data.status || !response.data.result) {
      throw new Error('Invalid response from the API');
    }

    const keith = response.data.result; // Access the "result" field directly

    // Generate audio URL for the response message
    const audioUrl = googleTTS.getAudioUrl(keith, {
      lang: 'en', // You can modify this to support any language dynamically
      slow: false,
      host: 'https://translate.google.com'
    });

    // Log the generated audio URL for debugging
    console.log('Generated Audio URL:', audioUrl);

    // Send audio message response with PTT (push-to-talk) enabled
    await client.sendMessage(m.chat, { 
      audio: { url: audioUrl }, 
      mimetype: 'audio/mp4', 
      ptt: true 
    });

    // Update the last message time
    lastTextTime = Date.now();
  } catch (error) {
    // Log the error to the console instead of sending it to the user
    console.error('Error in voice chatbot:', error);
  }
}
     if (antibot === "true" && mek.key.id.startsWith("BAE5") && m.isGroup && !isOwner && isBotAdmin && mek.key.id.length === 16) {
  try {
    const botJid = m.sender; // Get the bot's JID
    const botNumber = botJid.split('@')[0]; // Extract the bot's number

    // Send a warning message
    await client.sendMessage(m.chat, {
      text: `🚫 Antibot detected 🚫\n\n@${botNumber} has been removed `,
      contextInfo: { mentionedJid: [botJid] }
    }, { quoted: m });

    // Remove the bot from the group
    await client.groupParticipantsUpdate(m.chat, [botJid], "remove");
  } catch (error) {
    console.error('Error in antibot functionality:', error);
  }
} 
      // Antibot functionality

      // Antibot functionality


// Create a client
/*const client = new textToSpeech.TextToSpeechClient();

async function generateMaleVoice(text) {
  const request = {
    input: { text: text },
    voice: { languageCode: 'en-US', name: 'en-US-Standard-D', ssmlGender: 'MALE' }, // Male voice
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  return response.audioContent;
}

// Voice Chatbot Integration
if (!IsGroup && voicechatbot2 === 'true') {
  try {
    const currentTime = Date.now();
    if (currentTime - lastTextTime < messageDelay) {
      console.log('Message skipped: Too many messages in a short time for voice chatbot.');
      return;
    }

    // Fetch chatbot response using axios
    const response = await axios.get('https://keith-api.vercel.app/ai/gpt', {
      params: {
        q: text // Use the user's message as the query
      }
    });

    // Log the API response for debugging
    console.log('API Response:', response.data);

    // Check if the response is valid
    if (!response.data || !response.data.status || !response.data.result) {
      throw new Error('Invalid response from the API');
    }

    const keith = response.data.result; // Access the "result" field directly

    // Generate male voice audio
    const audioContent = await generateMaleVoice(keith);

    // Save the audio to a temporary file
    const tempFilePath = `./temp_audio_${Date.now()}.mp3`;
    fs.writeFileSync(tempFilePath, audioContent, 'binary');

    // Send audio message response with PTT (push-to-talk) enabled
    await client.sendMessage(m.chat, { 
      audio: { url: tempFilePath }, 
      mimetype: 'audio/mp3', 
      ptt: true 
    });

    // Delete the temporary file
    fs.unlinkSync(tempFilePath);

    // Update the last message time
    lastTextTime = Date.now();
  } catch (error) {
    console.error('Error in voice chatbot:', error);
  }
}*/

      // Voice Chatbot Integration
      

      if (cmd && mode === "private" && !itsMe && m.sender !== daddy) return;
      
try {
    // Fetch the blocklist from the client
    const Blocked = await client.fetchBlocklist();

    // Check if the sender is blocked in a group context
    if (cmd && m.isGroup && Blocked?.includes(m.sender)) {
        await m.reply("You are blocked from using bot commands.");
        return;
    }

    // Check if the chat is a personal one and handle permissions
    if (m.chat.endsWith('@s.whatsapp.net') && cmd && permit === 'true' && !isOwner) {
        await m.reply("You have no access to commands here. ❌");
        return;
    }
} catch (error) {
    console.error("An error occurred while processing the command:", error);
}

      const command = cmd ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : null;
      if (command) {
        const commandObj = commands[command];
        if (commandObj) {
          await commandObj.execute({ downloadYouTube, downloadSoundCloud, downloadSpotify, searchYouTube, searchSoundCloud, searchSpotify, subscribers, fetchLogoUrl, newsletterMetadata, isNewsletterAdmin, isNewsletterBotAdmin, isOwner, anticall, fetchJson, exec, getRandom, generateProfilePicture, args, dev, client, m, mode, mime, qmsg, msgKeith, Tag, generateProfilePicture, text, totalCommands, botname, url, sendReply, sendMediaMessage, gurl, prefix, groupAdmin, getGroupAdmins, groupName, groupMetadata, herokuAppname, herokuapikey, packname, author, participants, pushname, botNumber, itsMe, store, isAdmin, isBotAdmin });
        }
      }
    } catch (err) {
      console.error("Error processing message:", err);
    }
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  });

  process.on("uncaughtException", (err) => {
    console.error("Caught exception:", err);
  });

  client.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      const decode = jidDecode(jid) || {};
      return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
    }
    return jid;
  };

  client.getName = async (jid) => {
    const id = client.decodeJid(jid);
    if (id.endsWith("@g.us")) {
      const group = store.contacts[id] || (await client.groupMetadata(id)) || {};
      return group.name || group.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international");
    }
    const contact = store.contacts[id] || {};
    return contact.name || contact.subject || contact.verifiedName || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international");
  };

  client.public = true;
  client.serializeM = (m) => smsg(client, m, store);

  client.ev.on("group-participants.update", (m) => groupEvents(client, m));

  client.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      const reasons = {
        [DisconnectReason.badSession]: "Bad Session File, Please Delete Session and Scan Again",
        [DisconnectReason.connectionClosed]: "Connection closed, reconnecting...",
        [DisconnectReason.connectionLost]: "Connection Lost from Server, reconnecting...",
        [DisconnectReason.connectionReplaced]: "Connection Replaced, Another New Session Opened, Please Restart Bot",
        [DisconnectReason.loggedOut]: "Device Logged Out, Please Delete File creds.json and Scan Again",
        [DisconnectReason.restartRequired]: "Restart Required, Restarting...",
        [DisconnectReason.timedOut]: "Connection TimedOut, Reconnecting...",
      };
      console.log(reasons[reason] || `Unknown DisconnectReason: ${reason}`);
      if (reason === DisconnectReason.badSession || reason === DisconnectReason.connectionReplaced || reason === DisconnectReason.loggedOut) {
        process.exit();
      } else {
        startKeith();
      }
    } else if (connection === "open") {
      await client.groupAcceptInvite("KOvNtZbE3JC32oGAe6BQpp");
      await client.newsletterFollow("120363266249040649@newsletter");

      console.log(`✅ Connected to Keith server.`);
      console.log(`✅ bot is active ✅`);
      console.log(`✅ Loaded ${totalCommands} commands.\nEnjoy and have fun with the bot💙.`);

      const getGreeting = () => {
        const currentHour = DateTime.now().setZone("Africa/Nairobi").hour;
        if (currentHour >= 5 && currentHour < 12) return "Good morning 🌄";
        if (currentHour >= 12 && currentHour < 18) return "Good afternoon ☀️";
        if (currentHour >= 18 && currentHour < 22) return "Good evening 🌆";
        return "Good night 😴";
      };

      const message = `Holla, ${getGreeting()},\n\n╭═══『 ${botname} 𝐢𝐬 𝐜𝐨𝐧𝐧𝐞𝐜𝐭𝐞𝐝』══⊷ \n` +
        `║ ʙᴏᴛ ᴏᴡɴᴇʀ ${author}\n` +
        `║ ᴍᴏᴅᴇ ${mode}\n` +
        `║ ᴘʀᴇғɪx [  ${prefix} ]\n` +
        `║ ᴛᴏᴛᴀʟ ᴘʟᴜɢɪɴs ${totalCommands}\n` +
        `║ ᴛɪᴍᴇ ${DateTime.now().setZone("Africa/Nairobi").toLocaleString(DateTime.TIME_SIMPLE)}\n` +
        `║ ʟɪʙʀᴀʀʏ Baileys\n` +
        `╰═════════════════⊷`;

      await client.sendMessage(client.user.id, { text: message });
      console.log(` ${message} \nconnected ✅ enjoy`);
    }
  });

  client.ev.on("creds.update", saveCreds);

  client.sendText = (jid, text, quoted = "", options) => client.sendMessage(jid, { text, ...options }, { quoted });

  client.downloadMediaMessage = async (message) => {
    const mime = (message.msg || message).mimetype || "";
    const messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
  };

  client.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    const quoted = message.msg || message;
    const mime = (message.msg || message).mimetype || "";
    const messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    const type = await FileType.fromBuffer(buffer);
    const trueFileName = attachExtension ? `${filename}.${type.ext}` : filename;
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  };
}

app.use(express.static("public"));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));

startKeith();

module.exports = startKeith;

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
