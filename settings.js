// Bot settings

// You don't have to set this if you deploy using heroku because you can simply set them in environment variables, also don't forget to sleep

const session = process.env.SESSION || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0doT24zYVEyS0czcVNBVHZ2ZnpiTUpmTk1CR3Z4SUVwWW00bHF3dEdHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWkdUd2lVc2ttRTR4cU9wTHZqaHlUa2VNbG1IcUo0cnI3ZEk4cWVLcjdBaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPT0FQZDNJVGM2NXNESWlLN29BYlc3aWNYcmxMeXd5dzgwTytPQ2ZXbDJNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSK0ZQcDI0TDE1bG1pSGM0c2gyajVRUEdQTDM3R0ZCdGgrZllWbjVLN2ljPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdMeFBFekFrMU1FdHNoRldwSlhuVHRjalExd001emNFU1V5dFI3eDM4MTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktUTDIrSU8yMzAzaU8vWHNmaTQvek9Cb0NINmJaaVMrbEF5V0JYUjdTeUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUVEeHlxSlF3Wm9pV3lRQlhFMGtkaGdYdjgvcmJCN2d5WEZJQ3BrYWdFTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFBsT0hJL0hiTnpJNG5EUHREaDlPdDBJR1RhRDNRRnpVSDVzZzdNcnNRdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImMwLzM4cHViU01mRncxd2RCeElQYlQvTU93RmNHU25VZjFCTmt0UE1Cc000Z1V4a3lxaVZFdlRQdVJDbUV0NmJ3eFp1Ky9IWnhGOEY1aFY0eEdRbkRBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk2LCJhZHZTZWNyZXRLZXkiOiJTWFU4MDhxUnNnUEJQN2FNTjBjRDVsbkJ2SHhGdko2Mjh6cDVsTDc4bmZrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJKQ3otSTlQZlF1bXFUa0QyZS1iTElBIiwicGhvbmVJZCI6ImUzZDgxZDQzLTQzN2EtNGVmOS1iZWM1LTQxN2I5ZTNlYjA2ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSzdHTVgvVjVEOVFaMU92eUJ1ZFBnUzRlZVk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaTFnbldUSXhnL1Y2VmRJRjVucGtJZFZMMFNBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlpWQ1BKWDlZIiwibWUiOnsiaWQiOiI2MDExMTc1MDg1MjU6NjBAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ092TmtLZ0VFSWlNbTc0R0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImZBTlJxVThBVytDcWhsVWVyMm5oa0VSK0dqTzkrd2Jvb2J3ZFZuVEUwRkU9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImdOOXlFb3k2RHI4T3RQR3l1Y211K2NEeFVyYVVETUorY0M5dDJHclBCa2hta3VpbURoWGdka0NnWVFBRGdQRFFUOWRYYnZ0dm9IdU8wVDJNRHJOakJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJUVVpqMEs3dXpyNDFXeVZ2WjgrV2hmSGxDbEFoWGxEL3ZJMWZhV2p3ODlvQU4yZHdtY2FpdVBuVk5LcmxWenB2WUpYdXFjc0hUYkFFZlhyT2ZtbHdCdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjYwMTExNzUwODUyNTo2MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYd0RVYWxQQUZ2Z3FvWlZIcTlwNFpCRWZob3p2ZnNHNktHOEhWWjB4TkJSIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxMDgwMDg0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBTZSJ9';

const prefix = process.env.PREFIX || '';
const mycode = process.env.CODE || "254";
const author = process.env.OWNER_NAME || 'Keith';
const packname = process.env.PACKNAME || 'keith';
const dev = process.env.OWNER_NUMBER || '254748387615';
const DevKeith = dev.split(",");
const botname = process.env.BOTNAME || 'KEITH-MD';
const mode = process.env.MODE || 'public';
const gcpresence = process.env.GC_PRESENCE || 'false';
const antionce = process.env.ANTIVIEWONCE || 'true';
const sessionName = "session";
const presence = process.env.WA_PRESENCE || 'online';
const herokuapikey = process.env.HEROKU_API_KEY || '';
const herokuAppname = process.env.HEROKU_APP_NAME || '';
const url = process.env.URL || 'https://files.catbox.moe/mikdi0.jpg';
const gurl = process.env.GURL || 'https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47';
const reactemoji = process.env.EMOJI || '💚';
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
