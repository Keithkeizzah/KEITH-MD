// Bot settings

// You don't have to set this if you deploy using heroku because you can simply set them in environment variables, also don't forget to sleep

const session = process.env.SESSION || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0NYUmdSRFUrR1c1VXNON3FScjBGZTAzS1cza3hxc0N6d3d1NGw2eDRrST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTlp2cHo0b2xYUm5hYlVMdmhxSndBd2FwSzJFNitZY0FycWFlQnU5OTdHbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRRWZwSXg0RXIrUnFvR3ROTS81V1NwTEp3dnhiUHpYZmwxbEMxOUtzQmxnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFWXloSi9hNG13WG9saUFPRnhwZm8vU0pKWVB4VUl5TkY5WUExbU1GY1NVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1BakhlckpGVUpRUm5yeHQvbVRRb0JhWmExUkRQWlF6U1ZQa1VHdUxGMGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFyRzBNS0dZYnZJVjIyVkRweHB1U0gzUWhLMmMydmRaenExckxhOTdHVGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUF4UzFRZ09EVjUwMGRuT2gxclREY3FOZFVYWFVieWVRamJRUTArRncxcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidmFHcnUyWmw2WHJMNTNuNVl6Q1Q2dE1XYTdNeWRuUHZTdTBPR2dGQ2hXZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVISHdpQmVIR0RsdTNhZ2x3eUV0TWlaQnEyd2YvaS9wVHVTV3RKcVdycG5La2FLOTNmTjRxU2lwaFlOcER0RUU1ckRBSHd0TW1Xa3g1aHFGaFBKbkFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzMsImFkdlNlY3JldEtleSI6InhraGJDN29STkVzZXRWeEpUS1R0QkU4RVlNSzJhc0xxMzNUN25uZzZXSnc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkVQNU5MdHBwVDBLdHZOb1FGQWtnWHciLCJwaG9uZUlkIjoiY2ZlYjNiY2UtYjE0MC00OGIyLTg3NmQtOGQwMGJhNmFmN2RjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZ6NXVFd3lNVFd4OXRac014eGZUWnVrQlZ5UT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBTm1CeWJWTjR5V1QrWkZuWm9jd2NSSmpxcGc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiV0RTQ05HVkwiLCJtZSI6eyJpZCI6IjYwMTExNzUwODUyNTo2NUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTzNOa0tnRUVNMlNwcjRHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZkFOUnFVOEFXK0NxaGxVZXIybmhrRVIrR2pPOSt3Ym9vYndkVm5URTBGRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVGVQeFZ2RlorYjh3MHllWW1HWDRrMFFLbm5VNXFHRXRiaXBISFpqSk1SaU43aUVpU0NxVDB4aVIyN1FEMThtNzRDY001Z0Q4NjVuT1UwbTVHK2FQQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IkJ5dXMwd3BUYWNxK0NUbjA4eVcxcml1T0FNdGRGY0NMWlEwUjZFbmRlODcvYkhuc1BUZVRkZG8rWVFvQlh4cS8vdVBkUWtJcW42aGFkRWRsSEI4NUFBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNjAxMTE3NTA4NTI1OjY1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlh3RFVhbFBBRnZncW9aVkhxOXA0WkJFZmhvenZmc0c2S0c4SFZaMHhOQlIifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDEyNjExNDYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTHlVIn0=';

const prefix = process.env.PREFIX || '®'
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
const url = process.env.URL || '';
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
