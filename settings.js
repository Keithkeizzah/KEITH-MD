// Bot settings

// You don't have to set this if you deploy using heroku because you can simply set them in environment variables, also don't forget to sleep

const session = process.env.SESSION || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU05amF5ZHc3aGJ6RnczMUJPUHFCS2Z0dStrV2E4a3hBckJ5OVk0blhsND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVG02ck1YRzlXVFpjWjhqWWZQbS80cEZEZEpTcDNoZk8zS1ErRXdkWDVtTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3S2FMMnEvNkJsTXdYZndRVUZ1R3UzV3BaWHlyMjNQWUFxZWZFRnY4MEdZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrVVp6SmJ4QVdwOFFaYUJtQmo4a3QyNGVJdDZEdFZmTXNiQm9sc1FPcUdjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlBVlFudEhIN0Z6a2JaOGdMemxpK2QvS1RTYnFUQ21WZ05UUEpXZERKMXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktiZEJ3cHNVaHVXd3M3dHdJck94emNtYU91MG1JWENVYWtHd1NwZGU3alU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUtXeGc0WmVrdUZUbGtibUFhc2NyTGkyTG9neC9NVWp5dEZVWVVRR3FXdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK3pWUmhIZkRKMUY3V0dmRW1GWVVkeGVwMWVFZm5kSE1oRWlDckQ5ODBIST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndQU3RNK2NkVGRxSGpmcHQ1N3lMRlNWSU8rZW82Nkh6SmhqZHV1SDZPT2FWbUM1a2dwUjFybEJVMCtub01UUXh1ZE1ERmxPMzhVZ0t3SzVLRHVXVUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcwLCJhZHZTZWNyZXRLZXkiOiJEdmc0NnZzc1RRZmR1c2JZVk5MOVVHVDZWV09wYklGdEtyRGhLZHpkdjB3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJaZFBOS1c4cVJ0bThzSzhlNnBHaGZnIiwicGhvbmVJZCI6Ijg4NGU0OGY5LTc4MTQtNGQwOS1iNmMxLTYwN2M2ZjIwNjU2YiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyb3Qrd3Q1amJ1eVZWeHgyNTA2M2xXUUFzT3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibHhwaHExQWVWcC80dVFHaU1obUVLeHc2UVFVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkY5V1pUWlRYIiwibWUiOnsiaWQiOiIyNTQ3MTYyMjY0NjU6MzJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQ29ybmVsaXVzIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMYmc0WndHRUtPMnBiNEdHQThnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJXcDdZU1laSFV1Vy9FQWtvcGo4cFpWTzBOZFQrOFBqYmNwNm9ENnJSU1ZZPSIsImFjY291bnRTaWduYXR1cmUiOiJrVks5ODFObVFSWjZJSngvOERpYWhrTzJUTDB2bXhrNmdSNjdmczZDWXJqS2lXc3o0eExEa1E5aUZ2dE5Ib0p0RkhqTXVKVnBSZjNEV2trSW1UUEpDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVEpDSWViVlZvK2c4WGVPWDRQSTU3a2YrRWRiS3lKWGdhVTlsbW1QRUp1NWFtL3lPemxPWDNQZ3k2eWNmSlg5SjYvbUJYSzRzT05RVlpFdjBNOXBEQ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MTYyMjY0NjU6MzJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVnFlMkVtR1IxTGx2eEFKS0tZL0tXVlR0RFhVL3ZENDIzS2VxQStxMFVsVyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MTI0OTMyOSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBN2UifQ==';

const prefix = process.env.PREFIX || '.';
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
