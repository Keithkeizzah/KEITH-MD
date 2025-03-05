const {
  default: KeithConnect, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent,
  generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, useMultiFileAuthState,
  DisconnectReason, makeInMemoryStore, downloadContentFromMessage, jidDecode
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const FileType = require("file-type");
const { exec } = require("child_process");
const chalk = require("chalk");
const express = require("express");
const { DateTime } = require("luxon");
const util = require("util");
const speed = require("performance-now");
const { smsg } = require('./lib/smsg');
const {
  smsgsmsg, formatp, tanggal, formatDate, getTime, sleep, clockString,
  fetchJson, getBuffer, jsonformat, antispam, generateProfilePicture, parseMention,
  getRandom, fetchBuffer,
} = require("./lib/botFunctions.js");

const { TelegraPh, UploadFileUgu } = require("./lib/toUrl");
const uploadtoimgur = require("./lib/Imgur");

const { sendReply, sendMediaMessage } = require("./lib/context");
const ytmp3 = require("./lib/ytmp3");
const path = require("path");
const { commands, totalCommands } = require("./commandHandler");

const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require("./lib/exif");
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });

const authenticationn = require("./auth.js");
const daddy = "254748387615@s.whatsapp.net";

const {
  autoview, autoread, botname, timezone, autobio, mode, anticallmsg, reactemoji, prefix, presence,
  mycode, author, antibad, packname, url, gurl, herokuAppname, herokuapikey, anticall, dev, antilink, gcpresence, antionce, antitag, antidelete, autolike,
} = require("./settings");

const groupEvents = require("./groupEvents.js");

authenticationn();

const app = express();
const port = process.env.PORT || 10000;

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
        await client.sendMessage(callerId, { text: anticallmsg });
        lastTextTime = currentTime;
      }
    }
  });

  client.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      const mek = chatUpdate.messages[0];
      if (!mek.message) return;
      mek.message = mek.message.ephemeralMessage?.message || mek.message;

      if (autoview === "true" && mek.key?.remoteJid === "status@broadcast") {
        await client.readMessages([mek.key]);
      } else if (autoread === "true" && mek.key?.remoteJid.endsWith("@s.whatsapp.net")) {
        await client.readMessages([mek.key]);
      }

      if (autoview === 'true' && autolike === 'true' && mek.key && mek.key.remoteJid === "status@broadcast") {
        const keithlike = await client.decodeJid(client.user.id);
        const emojis = ['😂', '😥', '😇', '🥹', '💥', '💯', '🔥', '💫', '👽', '💗', '❤️‍🔥', '👁️', '👀', '🙌', '🙆', '🌟', '💧', '🎇', '🎆', '♂️', '✅'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        await client.sendMessage(mek.key.remoteJid, {
          react: { text: randomEmoji, key: mek.key }
        }, { statusJidList: [mek.key.participant, keithlike] });
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
      const Ghost = "254796299159";
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

      const getGroupAdmins = (participants) => {
        return participants.filter(p => p.admin === "superadmin" || p.admin === "admin").map(p => p.id);
      };

      const quoted = m.quoted ? m.quoted : m;
      const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(() => {}) : "";
      const participants = m.isGroup && groupMetadata ? groupMetadata.participants : [];
      const groupAdmin = m.isGroup ? getGroupAdmins(participants) : [];
      const isBotAdmin = m.isGroup ? groupAdmin.includes(botNumber) : false;
      const isAdmin = m.isGroup ? groupAdmin.includes(m.sender) : false;

      const context = {
        client, m, text, isBotMessage, isBotAdmin, isOwner, isAdmin,
        participants, pushname, body, args, mime: quoted.mimetype || "",
        qmsg: quoted, msgKeith: m.message.extendedTextMessage?.contextInfo?.quotedMessage,
        botNumber, itsMe, packname, author, generateProfilePicture, groupMetadata,
        fetchJson, exec, antibad, getRandom, UploadFileUgu, TelegraPh, prefix, cmd,
        botname, mode, antilink, antidelete, fetchBuffer, uploadtoimgur, ytmp3, getGroupAdmins, Tag
      };

      if (body && /https?:\/\/[^\s]+/.test(body) && m.isGroup && antilink === 'true' && !isOwner && isBotAdmin && !isAdmin) {
        const kid = m.sender;
        await client.sendMessage(m.chat, {
          text: `🚫Antilink detected🚫\n\n@${kid.split("@")[0]}, do not send links!`,
          contextInfo: { mentionedJid: [kid] }
        }, { quoted: m });
        await client.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.key.id, participant: kid } });
        if (isBotAdmin) await client.groupParticipantsUpdate(m.chat, [kid], 'remove');
      }

      const forbiddenWords = ['kuma', 'mafi', 'kumbavu', 'ngombe', 'fala', 'asshole', 'cunt', 'cock', 'slut', 'fag'];
      if (body && forbiddenWords.some(word => body.toLowerCase().includes(word)) {
        if (m.isGroup && antibad === 'true' && isBotAdmin && !isOwner && !isAdmin) {
          const kid = m.sender;
          await client.sendMessage(m.chat, {
            text: `🚫Bad word detected🚫\n\n@${kid.split("@")[0]}, do not use offensive language!`,
            contextInfo: { mentionedJid: [kid] }
          }, { quoted: m });
          await client.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.key.id, participant: kid } });
          await client.groupParticipantsUpdate(m.chat, [kid], 'remove');
        }
      }

      if (cmd && mode === "private" && !itsMe && !isOwner && m.sender !== daddy) return;

      const command = cmd ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : null;
      if (command && commands[command]) {
        await commands[command].execute(context);
      }
    } catch (err) {
      console.error("Error processing message:", err);
    }
  });

  client.decodeJid = (jid) => {
    if (!jid) return jid;
    const decoded = jidDecode(jid) || {};
    return decoded.user && decoded.server ? `${decoded.user}@${decoded.server}` : jid;
  };

  client.getName = async (jid) => {
    const id = client.decodeJid(jid);
    if (id.endsWith("@g.us")) {
      const group = store.contacts[id] || await client.groupMetadata(id).catch(() => ({}));
      return group.subject || id.replace(/@.+/, '');
    }
    const contact = store.contacts[id] || {};
    return contact.name || contact.verifiedName || id.replace(/@.+/, '');
  };

  client.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      const statusMessages = {
        [DisconnectReason.badSession]: "Invalid session - Delete session and rescan",
        [DisconnectReason.connectionClosed]: "Connection closed - Reconnecting...",
        [DisconnectReason.connectionLost]: "Connection lost - Reconnecting...",
        [DisconnectReason.connectionReplaced]: "Connection replaced - Restart required",
        [DisconnectReason.loggedOut]: "Logged out - Delete session and rescan",
        [DisconnectReason.restartRequired]: "Restart required - Rebooting...",
        [DisconnectReason.timedOut]: "Connection timeout - Reconnecting..."
      };
      console.log(statusMessages[reason] || `Unknown disconnect reason: ${reason}`);
      if ([DisconnectReason.badSession, DisconnectReason.connectionReplaced, DisconnectReason.loggedOut].includes(reason)) {
        process.exit();
      } else {
        startKeith();
      }
    } else if (connection === "open") {
      console.log(`✅ Connected successfully\nLoaded ${totalCommands} commands`);
      const greeting = () => {
        const hour = DateTime.now().setZone("Africa/Nairobi").hour;
        if (hour < 12) return "Good morning 🌄";
        if (hour < 18) return "Good afternoon ☀️";
        if (hour < 22) return "Good evening 🌆";
        return "Good night 🌙";
      };
      await client.sendMessage(client.user.id, {
        text: `${greeting()} ${author}!\n\n${botname} is now online\nMode: ${mode}\nPrefix: ${prefix}\nCommands: ${totalCommands}`
      });
    }
  });

  client.ev.on("creds.update", saveCreds);
}

app.use(express.static("public"));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.listen(port, () => console.log(`Server running on port ${port}`));

startKeith();

process.on("unhandledRejection", (err) => console.error("Unhandled rejection:", err));
process.on("uncaughtException", (err) => console.error("Uncaught exception:", err));
