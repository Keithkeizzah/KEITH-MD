const {
  BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent,
  generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const speed = require("performance-now");
const {
  smsg, formatp, tanggal, formatDate, getTime, sleep, clockString, fetchJson, getBuffer, jsonformat, generateProfilePicture,
  parseMention, getRandom, fetchBuffer
} = require('./lib/botFunctions.js');

const daddy = "254748387615@s.whatsapp.net";
const { exec, spawn, execSync } = require("child_process");
const { TelegraPh, UploadFileUgu } = require("./lib/toUrl");
const uploadtoimgur = require('./lib/Imgur');
const ytmp3 = require('./lib/ytmp3');
const path = require('path');
const { commands, totalCommands } = require('./commandHandler');
const blocked_users = require('./Functions/blocked_users');
const status_saver = require('./Functions/status_saver');
const eval2 = require('./Functions/eval2');
const eval = require('./Functions/eval');
const antiviewonce = require('./Functions/antiviewonce');
const gcPresence = require('./Functions/gcPresence');
const antilinkgc = require('./Functions/antilink');
const antitaggc = require('./Functions/antitag');
const antibadgc = require('./Functions/antibad');
const antidel = require('./Functions/antidelete');
const antibotgc = require('./Functions/antibot');
const masterEval = require('./Functions/masterEval');

const {
  presence, autoread, botname, mode, prefix, mycode, author, packname,
  dev, gcpresence, antionce, permit, antitag, antibad, antibot, antilink, antidelete
} = require('./settings');

module.exports = Keith = async (client, m, chatUpdate, message, store) => {
  try {
    let body = m.mtype === "conversation" ? m.message.conversation :
               m.mtype === "imageMessage" ? m.message.imageMessage.caption :
               m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text : "";

    const Tag = m.mtype === "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null
      ? m.message.extendedTextMessage.contextInfo.mentionedJid
      : [];

    let msgKeith = m.message.extendedTextMessage?.contextInfo?.quotedMessage;
    let budy = typeof m.text === "string" ? m.text : "";

    const timestamp = speed();
    const Keithspeed = speed() - timestamp;

    const cmd = body.startsWith(prefix);
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await client.decodeJid(client.user.id);
    const itsMe = m.sender === botNumber;
    const isBotMessage = m.sender === botNumber;
    let text = args.join(" ");
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);

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

    const DevKeith = dev.split(",");
    const Owner = DevKeith.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender);

    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(() => {}) : "";
    const groupName = m.isGroup && groupMetadata ? groupMetadata.subject : "";
    const participants = m.isGroup && groupMetadata ? groupMetadata.participants : [];
    const groupAdmin = m.isGroup ? getGroupAdmins(participants) : [];
    const isBotAdmin = m.isGroup ? groupAdmin.includes(botNumber) : false;
    const isAdmin = m.isGroup ? groupAdmin.includes(m.sender) : false;

    const IsGroup = m.chat?.endsWith("@g.us");

    const context = {
      client, m, text, isBotMessage, message, Owner, chatUpdate, store, isBotAdmin, isAdmin, IsGroup,
      participants, pushname, body, budy, totalCommands, args, mime, qmsg, msgKeith, botNumber, itsMe, packname,
      author, generateProfilePicture, groupMetadata, Keithspeed, mycode, fetchJson, exec, antibad, getRandom, UploadFileUgu,
      TelegraPh, prefix, cmd, botname, mode, gcpresence, antibot, permit, antitag, antilink, antidelete, antionce, fetchBuffer,
      store, uploadtoimgur, chatUpdate, ytmp3, getGroupAdmins, Tag
    };

    if (cmd && mode === 'private' && !itsMe && !Owner && m.sender !== daddy) {
      return;
    }

    if (m.chat.endsWith('@s.whatsapp.net') && cmd && permit === 'true' && !Owner) {
      await m.reply("Access denied");
      return;
    }

    if (await blocked_users(client, m, cmd)) {
      await m.reply("You are blocked from using bot commands.");
      return;
    }

    await status_saver(client, m, Owner, prefix);
    await eval2(client, m, Owner, budy, fetchJson);
    await eval(client, m, Owner, budy, fetchJson, store);
    await antilinkgc(client, m, isBotAdmin, itsMe, isAdmin, Owner, body, antilink);
    await antiviewonce(client, m, antionce);
    await antidel(client, m, antidelete);
    await gcPresence(client, m, gcpresence);
    await antibadgc(client, m, isBotAdmin, itsMe, isAdmin, Owner, body, antibad);
    await antitaggc(client, m, isBotAdmin, itsMe, isAdmin, Owner, body, antitag);
    await antibotgc(client, m, isBotAdmin, itsMe, isAdmin, Owner, body, isBotMessage, message, antibot);
    await masterEval(client, m, Owner, budy, fetchJson, store);

    const command = cmd ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : null;
    if (commands[command]) {
      await commands[command](context);
    }

  } catch (err) {
    console.error(util.format(err));
  }

  process.on('uncaughtException', (errr) => {
    let e = String(errr);
    if (e.includes("conflict") || e.includes("not-authorized") || e.includes("Socket connection timeout") ||
        e.includes("rate-overlimit") || e.includes("Connection Closed") || e.includes("Timed Out") ||
        e.includes("Value not found")) {
      return;
    }
    console.error('Caught exception: ', errr);
  });
};
