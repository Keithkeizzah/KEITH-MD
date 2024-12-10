/* Bot settings 

You don't have to set this if you deploy using heroku because you can simply set them in environment variables, also don't forget to sleep */


const session = process.env.SESSION || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0pTMWVtcFpkZ1JuQ1Q3akFDdGYxa0hYQS9vaW9FMlpFSFlWUTdqZTVsdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWdqM29Xc0lPRkhNZlpKaXNGdUhjWkp2TTBVc0JYUzRITSs0eGs3UjJ3RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2UHNzMXlrWEVETTJXMG5DTmN5bnZ1Vkk4Z3JIYUxibXlDaUtMd05tYjNvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzS0JZeXR3ei9qYXMzb0NhQVo1cmRMK3owWkw0eWxabkEydUE5cFk5ZUhJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndLRUgxWUg4blJqRkQwWGt1VTIxSGt4amlzdHFsRFpkSmRuN2NZek9CblU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZHZVhNS0ZMREE2bi90dmFJd0NZb3B0MUhaTnBtOFZOREJkMU9JNU9FZ2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUVqSG1nWmo5MzUrOE43bFZwblhPQUpNY2I0U2ZpZWJ1a2JyS0Nab2wwdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiejgrTW5UeHZheDdxSW9mOFhZTURkLzZvQmhVWUhIZHA2T3B3WmZsb0tYQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkUwaUdpMkpxQWpEYXJsZkU5M1lMa1dmbGlUdXJMVi9oMy9ya1dLZjA2RVlhZWVuekxlRVV6UEtiMWlEMXdwcytmN0FyUFpuRWFCMlFJU3lpazZ1OUNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM1LCJhZHZTZWNyZXRLZXkiOiJwUmF6N2FHakQrUHJzN3l3YVkwN3hTR0hra3plKzNMNExsKzA4bnI5L0tJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ2Q1ZOYy1RTVNuS2VNN3dYZW5lU2xnIiwicGhvbmVJZCI6IjY5MjkxN2FiLTk5MGMtNDQxMS05MGRmLTcyZDdiZWI4YTk3ZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIybGRDbWxVZG56VFN4S3hzSWRiMDBWRnFrZU09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoianNnNGRYRlNZVDluV01zdG9CWHJOL1dic1lrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBQRFI2UThHIiwibWUiOnsiaWQiOiIyNTQ3OTk0MTQyNDY6NjlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0p1L29Ic1F3YjdpdWdZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ilh0M0xoUkk2UWpVT3BLdUhYUG9vZ2RmaTFmNUorNzlaYzNHT1Y3SVVlRXc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjZEVnQ4NmowUVBIQ3pCVjJFUERibHhsOXhjVHFhTVpCRXBwb1VsOEY0UDBGQU5vTThRMU4ya2JQNXVBUHdmazJjWGs4eUQydzlxSzQ3Sjk4VTIvRUFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIyaDVqa2ZNTUFaZ3VkdHZCbTQ3U0FYdFpYWitmMjJCWEl6cFczUUJvKzRXTFRDZnhqMVdSVjg1QlRMTnZNVU5wbWFVNTdHM3dMRFpVK29KN00xbGNEQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc5OTQxNDI0Njo2OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWN2R5NFVTT2tJMURxU3JoMXo2S0lIWDR0WCtTZnUvV1hOeGpsZXlGSGhNIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMzODYxMjAwfQ==';

const prefix = process.env.PREFIX || '.';
const mycode = process.env.CODE || "254";
const author = process.env.STICKER_AUTHOR || 'Keith';
const packname = process.env.PACKNAME || 'keith';
const dev = process.env.DEV || '254799414246';
const DevKeith = dev.split(",");
const botname = process.env.BOTNAME || 'KEITH-MD';
const mode = process.env.MODE || 'public';
const gcpresence = process.env.GC_PRESENCE || 'false';
const antionce = process.env.ANTIVIEWONCE || 'true';
const sessionName = "session";
const presence = process.env.WA_PRESENCE || 'online';

const antitag = process.env.ANTITAG || 'false';
const antispam = process.env.ANTISPAM || 'false';
const chatbot = process.env.CHAT_BOT || 'false';
const antilink = process.env.ANTILINK || 'false';
const autoreact = process.env.AUTOREACT || 'false';
const antibot = process.env.ANTIBOT || 'false';
const anticall = process.env.ANTICALL || 'false';
const antibad = process.env.ANTI_BAD_WORD || 'false';
const antidelete = process.env.ANTIDELETE || 'false';
const autoview = process.env.AUTOVIEW_STATUS || 'true';
const autolike = process.env.AUTOLIKE_STATUS || 'true';
const autoread = process.env.AUTOREAD || 'true';
const autobio = process.env.AUTOBIO || 'false';

module.exports = {
  sessionName,
  presence,
  autoview,
  autoread,
  botname,
  autobio,
  autoreact,
  mode,
  antibad,
  antilink,
  prefix,
  anticall,
  chatbot,
  autolike,
  mycode,
  author,
  packname,
  dev,
  DevKeith,
  gcpresence,
  antionce,
  antibot,
  session,
  antitag,
  antidelete
};
