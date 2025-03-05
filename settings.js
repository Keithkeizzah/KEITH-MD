// Bot settings

// You don't have to set this if you deploy using heroku because you can simply set them in environment variables, also don't forget to sleep

const session = process.env.SESSION || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkcweVk4Sk15K3BLU1F1Vk00Y1B6aVpPbWFmY1JOak03L1hvZDh6UjNrWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM2JhTG0vOG9Ydkd6Umw5RzRmR1JGQVRuV3FCZEZseWJCSVAveEp0bGdVWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPRGgxc2ZQSTFZbmZVeGNTTHFmeXhFcXVHM0RjRkFjcDNlMEh4bDAxeUY4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaZGJFTWlVaXlUODI2QmdPL2pVZWdDRFdDN3FSaXhBL2FPR2FIeTVNaFc0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVMZ3JVTjQwMXg2YUQzNCtSSTRvK3VoazhxTi9JS2ZteW56TVV4T1kxbHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5nNHZxcHlMZjdDdWZxQzVqUjVuOGVydmRnRFh3SFJtYm52dFRxNjVUMFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUF0VmVkcjc1NXI0aHR5K2t3bHR4UmpxN0VETW5xcjEwWENWRXVMSWZWOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicFhqc0w3azh2TE5wUTBZemxiZmU3Qm9ubU5CUEcvc1p1ZTh6bzBCV29CMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkViaXRRbTVqa2hmU25jeUlmWFFZTEE0dHNpazVCdEViZE52YzBEL3ZMQWcrNVJOK0FwdXFXVzg2a0ZzYzVpV0I4NHR3SVp5Sng2NkQvRWFnMUFrTkJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTUsImFkdlNlY3JldEtleSI6Imw3cktXU3ZmMUlVL24yNkFmZVR3NUlQYThiRzd6WmVCTnJuK09UY3FlUTQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjhiU2RwdG9BUkl1aXBqMmpGdGNUcGciLCJwaG9uZUlkIjoiM2U2MWIzM2QtZmU3Ny00Y2YxLTlkMDYtNjYyNTBjZGExMGYyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdnQkhyMG8wVTJkcncxc0xQUElvbnRPOTRuTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuUUl5V0NBL3V5ZldZU2VyUGNkbFl3cW5VWnc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWUdNWEtKTlgiLCJtZSI6eyJpZCI6IjYwMTExNzUwODUyNTo2MUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT3pOa0tnRUVJcTJucjRHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZkFOUnFVOEFXK0NxaGxVZXIybmhrRVIrR2pPOSt3Ym9vYndkVm5URTBGRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoidXFmYnZmQmRHUnJjZXMxV1hLV25XZHhobWxWdHRHb2ljNDlvY0ZzRTVTeXpmRTBPQzIzVkhUUWtXUm84cGZ5MDVSbTRPclVuSDhDZ2x3S0V3ZEhQQlE9PSIsImRldmljZVNpZ25hdHVyZSI6Ilhsa0NvQW04dEYyVGZoaEJFSUo0eXhiZ3Bjd2NCRnVVY0ZTR21xRTdsUXJVUXhoZ3BIa09WcXNsLytxU1hYYnJONzRSVVNjWG9GQXhFNnRKRlNwZkJRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNjAxMTE3NTA4NTI1OjYxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlh3RFVhbFBBRnZncW9aVkhxOXA0WkJFZmhvenZmc0c2S0c4SFZaMHhOQlIifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDExMzQ2MTUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTHlRIn0=';

const prefix = process.env.PREFIX || '꧁ঔ☬۝𝐙𝐀𝐘𝐀𝐍𝐅𝐎𝐔𝐑𝐅𝐈𝐍𝐆𝐄𝐑𝐒۝☬ঔ꧂';
const mycode = process.env.CODE || "254";
const author = process.env.OWNER_NAME || '꧁ঔ☬۝𝐙𝐀𝐘𝐀𝐍𝐅𝐎𝐔𝐑𝐅𝐈𝐍𝐆𝐄𝐑𝐒۝☬ঔ꧂';
const packname = process.env.PACKNAME || '꧁ঔ☬۝𝐙𝐀𝐘𝐀𝐍𝐅𝐎𝐔𝐑𝐅𝐈𝐍𝐆𝐄𝐑𝐒۝☬ঔ꧂';
const dev = process.env.OWNER_NUMBER || '601117508525';
const DevKeith = dev.split(",");
const botname = process.env.BOTNAME || '꧁ঔ☬۝𝐙𝐀𝐘𝐀𝐍𝐅𝐎𝐔𝐑𝐅𝐈𝐍𝐆𝐄𝐑𝐒۝☬ঔ꧂';
const mode = process.env.MODE || 'public';
const gcpresence = process.env.GC_PRESENCE || 'false';
const antionce = process.env.ANTIVIEWONCE || 'true';
const sessionName = "session";
const presence = process.env.WA_PRESENCE || 'online';
const herokuapikey = process.env.HEROKU_API_KEY || '';
const herokuAppname = process.env.HEROKU_APP_NAME || '';
const url = process.env.URL || 'https://files.catbox.moe/mikdi0.jpg';
const gurl = process.env.GURL || 'https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47';
const reactemoji = process.env.EMOJI || '💚🩷🧡❤️💛💙🩵💜🤍🤎🩶🖤💗❤️‍🔥💟💓💖💝';
const antitag = process.env.ANTITAG || 'true';
const groupControl = process.env.GROUP_CONTROL || 'true';
const anticall = process.env.ANTICALL || 'true';
const antidelete = process.env.ANTIDELETE || 'true';
const autoview = process.env.AUTOVIEW_STATUS || 'true';
const autolike = process.env.AUTOLIKE_STATUS || 'true';
const timezone = process.env.TIMEZONE || 'Africa/Nairobi';
const autoread = process.env.AUTOREAD || 'true';
const anticallmsg = process.env.ANTICALL_MSG || 'Keith declined your 🤙 call';
const autobio = process.env.AUTOBIO || 'false';

module.exports = {
  sessionName,
  presence,
  autoview,
  autoread,
  botname,
  reactemoji,
  autobio,
  antilink: groupControl,  // Use groupControl for antilink
  antibad: groupControl,   // Use groupControl for antibad
  mode,
  prefix,
  anticall,
  autolike,
  anticallmsg,
  mycode,
  author,
  herokuAppname,
  herokuapikey,
  url,
  gurl,
  packname,
  dev,
  DevKeith,
  gcpresence,
  antionce,
  session,
  antitag,
  antidelete
};
