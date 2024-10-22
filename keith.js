const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const speed = require("performance-now");
const { smsg, formatp, tanggal, formatDate, getTime, sleep, clockString, fetchJson, getBuffer, jsonformat, generateProfilePicture, parseMention, getRandom, fetchBuffer } = require('./lib/botFunctions.js');
const daddy = "254114018035@s.whatsapp.net";
const { exec, spawn, execSync } = require("child_process");
const {  TelegraPh, UploadFileUgu } = require("./lib/toUrl");
const uploadtoimgur = require('./lib/Imgur')
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
const masterEval = require('./Functions/masterEval');



const {
   presence, autoread, botname,
  mode, prefix, mycode, author, packname,
  dev, gcpresence, antionce, antitag, antidelete
} = require('./settings');


module.exports = dreaded = async (client, m, chatUpdate, store) => {
  try {
    var body =
  m.mtype === "conversation"
    ? m.message.conversation
    : m.mtype === "imageMessage"
    ? m.message.imageMessage.caption
    : m.mtype === "extendedTextMessage"
    ? m.message.extendedTextMessage.text
    : "";
    const Tag =
      m.mtype == "extendedTextMessage" &&
      m.message.extendedTextMessage.contextInfo != null
        ? m.message.extendedTextMessage.contextInfo.mentionedJid
        : [];

var msgDreaded = m.message.extendedTextMessage?.contextInfo?.quotedMessage;

var budy = typeof m.text == "string" ? m.text : "";
   
 const timestamp = speed(); 
   const dreadedspeed = speed() - timestamp 

    const cmd = body.startsWith(prefix);
  
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await client.decodeJid(client.user.id);
    const itsMe = m.sender == botNumber ? true : false;
    let text = (q = args.join(" "));
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);

    const getGroupAdmins = (participants) => { 
       let admins = []; 
       for (let i of participants) { 
         i.admin === "superadmin" ? admins.push(i.id) : i.admin === "admin" ? admins.push(i.id) : ""; 
       } 
       return admins || []; 
     };
    const fortu = (m.quoted || m); 
         const quoted = (fortu.mtype == 'buttonsMessage') ? fortu[Object.keys(fortu)[1]] : (fortu.mtype == 'templateMessage') ? fortu.hydratedTemplate[Object.keys(fortu.hydratedTemplate)[1]] : (fortu.mtype == 'product') ? fortu[Object.keys(fortu)[0]] : m.quoted ? m.quoted : m; 



    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };
    const mime = (quoted.msg || quoted).mimetype || "";
            const qmsg = (quoted.msg || quoted);


const DevDreaded = dev.split(",");
    const Owner = DevDreaded.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
   
                                            const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
const groupName = m.isGroup && groupMetadata ? await groupMetadata.subject : "";
    const participants = m.isGroup && groupMetadata ? await groupMetadata.participants : ""; 
     const groupAdmin = m.isGroup ? await getGroupAdmins(participants) : "";  
     const isBotAdmin = m.isGroup ? groupAdmin.includes(botNumber) : false; 
     const isAdmin = m.isGroup ? groupAdmin.includes(m.sender) : false;

            const IsGroup = m.chat?.endsWith("@g.us");

const context = {
    client, m, text, Owner, chatUpdate, store, isBotAdmin, isAdmin, IsGroup, participants,
    pushname, body, budy, totalCommands, args, mime, qmsg, msgDreaded, botNumber, itsMe,
    packname, author, generateProfilePicture, groupMetadata, dreadedspeed, mycode,
    fetchJson, exec, getRandom, UploadFileUgu, TelegraPh, prefix, cmd, botname, mode, gcpresence, antitag,antidelete, antionce, fetchBuffer,store, uploadtoimgur, chatUpdate, ytmp3, getGroupAdmins, Tag
};
if (cmd && mode === 'private' && !itsMe && !Owner && m.sender !== daddy ) {
return;
}

  
if (await blocked_users(client, m, cmd)) {
            await m.reply("You are blocked from using bot commands.");
            return;
        }

// await antidel(client, m, store, chatUpdate, antidelete);
await status_saver(client, m, Owner, prefix)
await eval2(client, m, Owner, budy, fetchJson)
await eval(client, m, Owner, budy, fetchJson, store)
await antilink(client, m, isBotAdmin, isAdmin, Owner, body);
await antiviewonce(client, m, antionce);
await gcPresence(client, m, gcpresence);
await antitaggc(client, m, isBotAdmin, itsMe, isAdmin, Owner, body, antitag);

await masterEval(client, m, Owner, budy, fetchJson, store);


    const command = cmd ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : null;

        if (commands[command]) {
    await commands[command](context);
        } 






    } catch (err) {
        console.log(util.format(err));
    }

process.on('uncaughtException', function (errr) {
let e = String(errr)
if (e.includes("conflict")) return
if (e.includes("not-authorized")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', errr)
})


};
