const {
  BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent,
  proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia,
  areJidsSameUser, getContentType
} = require('@whiskeysockets/baileys');

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const speed = require('performance-now');
const { 
  smsg, formatp, tanggal, formatDate, getTime, sleep, clockString, fetchJson, 
  getBuffer, jsonformat, generateProfilePicture, parseMention, getRandom, fetchBuffer 
} = require('./lib/botFunctions.js');

const { exec, spawn, execSync } = require('child_process');
const { TelegraPh, UploadFileUgu } = require('./lib/toUrl');
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
const antilink = require('./Functions/antilink');
const antitaggc = require('./Functions/antitag');
const antibotgc = require('./Functions/antibot');
const masterEval = require('./Functions/masterEval');

const {
  presence, autoread, botname, mode, prefix, antilink, mycode, author, packname,
  dev, gcpresence, antionce, antitag, antibot, antidelete
} = require('./settings');

module.exports = Keith = async (client, m, chatUpdate, message, store) => {
  try {
    let body = m.mtype === 'conversation' ? m.message.conversation : 
               m.mtype === 'imageMessage' ? m.message.imageMessage.caption :
               m.mtype === 'extendedTextMessage' ? m.message.extendedTextMessage.text : '';

    const Tag = m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.contextInfo
      ? m.message.extendedTextMessage.contextInfo.mentionedJid : [];

    let msgKeith = m.message.extendedTextMessage?.contextInfo?.quotedMessage;
    let budy = typeof m.text === 'string' ? m.text : '';

    const timestamp = speed(); 
    const Keithspeed = speed() - timestamp;
    const cmd = body.startsWith(prefix);

    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || 'No Name';
    const botNumber = await client.decodeJid(client.user.id);
    const itsMe = m.sender === botNumber;
    const isBotMessage = m.sender === botNumber;
    const text = args.join(' ');
    const arg = budy.trim().substring(budy.indexOf(' ') + 1);
    const arg1 = arg.trim().substring(arg.indexOf(' ') + 1);

    const getGroupAdmins = (participants) => participants.filter(i => i.admin === 'admin' || i.admin === 'superadmin').map(i => i.id);
    const keizzah = m.quoted || m;
    const quoted = (keizzah.mtype === 'buttonsMessage') 
      ? keizzah[Object.keys(keizzah)[1]] 
      : (keizzah.mtype === 'templateMessage') 
      ? keizzah.hydratedTemplate[Object.keys(keizzah.hydratedTemplate)[1]] 
      : (keizzah.mtype === 'product') 
      ? keizzah[Object.keys(keizzah)[0]] 
      : m.quoted ? m.quoted : m;

    const color = (text, color) => color ? chalk.keyword(color)(text) : chalk.green(text);
    const mime = quoted?.msg?.mimetype || '';
    const qmsg = quoted?.msg || quoted;

    const DevKeith = dev.split(',').map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net');
    const Owner = DevKeith.includes(m.sender);
   
    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(() => {}) : '';
    const groupName = m.isGroup && groupMetadata ? groupMetadata.subject : '';
    const participants = m.isGroup && groupMetadata ? groupMetadata.participants : ''; 
    const groupAdmin = m.isGroup ? getGroupAdmins(participants) : '';  
    const isBotAdmin = m.isGroup ? groupAdmin.includes(botNumber) : false; 
    const isAdmin = m.isGroup ? groupAdmin.includes(m.sender) : false;

    const IsGroup = m.chat?.endsWith('@g.us');
    const context = {
      client, m, text, isBotMessage, message, Owner, chatUpdate, store, isBotAdmin, isAdmin,
      IsGroup, participants, pushname, body, budy, totalCommands, args, mime, qmsg, msgKeith,
      botNumber, itsMe, packname, author, generateProfilePicture, groupMetadata, Keithspeed, mycode,
      fetchJson, exec, antilink, getRandom, UploadFileUgu, TelegraPh, prefix, cmd, botname, mode,
      gcpresence, antibot, antitag, antidelete, antionce, fetchBuffer, uploadtoimgur, ytmp3, getGroupAdmins, Tag
    };

    // If the bot is in private mode and it's not the owner or a specific number, ignore the command
    if (cmd && mode === 'private' && !itsMe && !Owner && m.sender !== daddy) {
      return;
    }

    // Check if the user is blocked
    if (await blocked_users(client, m, cmd)) {
      await m.reply("You are blocked from using bot commands.");
      return;
    }

    // Call functions related to different features
    await status_saver(client, m, Owner, prefix);
    await eval2(client, m, Owner, budy, fetchJson);
    await eval(client, m, Owner, budy, fetchJson, store);
    await antiviewonce(client, m, antionce);
    await gcPresence(client, m, gcpresence);
    await antitaggc(client, m, isBotAdmin, itsMe, isAdmin, Owner, body, antitag);
    await antilink(client, m, isBotAdmin, itsMe, isAdmin, Owner, body, antilink);
    await antibotgc(client, m, isBotAdmin, itsMe, isAdmin, Owner, body, isBotMessage, message, antibot);

    await masterEval(client, m, Owner, budy, fetchJson, store);

    const command = cmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : null;

    // Execute the command if it exists
    if (commands[command]) {
      await commands[command](context);
    }

  } catch (err) {
    console.error(util.format(err));
  }

  process.on('uncaughtException', (errr) => {
    const e = String(errr);
    if (['conflict', 'not-authorized', 'Socket connection timeout', 'rate-overlimit', 'Connection Closed', 'Timed Out', 'Value not found'].some(val => e.includes(val))) return;
    console.log('Caught exception: ', errr);
  });
};
