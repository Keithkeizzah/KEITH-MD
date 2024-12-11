/* Bot settings 

You don't have to set this if you deploy using heroku because you can simply set them in environment variables, also don't forget to sleep */


const session = process.env.SESSION || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUFKeFIwMnppYzBQUGk2NmRIMUxZSVYyWXkrT2k2c3p5eXI2KzZNTHNWOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSkVKYnN3UTcvbEpzSWFnRTBNM244ZzlKVWhnR0YxZEp1QjZNSWxMK2F3UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySXEzK1ViNXRucm4vajc4aERYbGUraS85WnBVNTBld2xLS0w1WFk2ODFRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3TWZob3paaGV1SkVJcjhuR0haSGE3enV0NTl6czZpWEFvbDZwOHdtdzBVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndFTkJjODJrQSs0TUZKQTNMN2JnS1dkRE02RVRNNWdEYnNvbG4yVTRwVmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im14WXlrS0xGMnZnSGtBcXoyRE1YRkVYblU4Vm5ibzhWb3hQei9ybVp4MlU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkJpbmlBRER2TGVaZWR4ZngzZUlUUWtnSUs2WWU0V2pwbjQ0M2dLa2pWZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU95bjRkdW1Zc2UxSDd5V2ZwTFN3U1JvUUxlTTJnajBpYW5CbEZFc2dXVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InIvaStuNTc2VWFpMk0vRjlWV0xoaUFSYlcrZHJrb3NFeE1qK280QzRSR3grc3lNdzZSSjBocktTejE1RDdCS0JDMkJxQ3BrbTd4NUNLdzY2Q0lTMUJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc1LCJhZHZTZWNyZXRLZXkiOiJLUVIzRmg0eTNvRnNuQzh6MzY0Q29YTFYvdzdqK0l3OVBSeGJCamxCN3VZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzU1NzU2MDkxMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzMjM4OUZENEVGQkVDN0Q5QzQwRUU3QkE5MjM4Mzk5MiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzMzOTA5NjQ4fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJHdXpNa09nQ1FqaWtoUm1WSVE1S0NRIiwicGhvbmVJZCI6IjE3YjIyM2Y5LWIwYjAtNDhmMy05NzA5LTFhM2I2NThlMWJlMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvWnpMbWRqeE1rZmRid29oSUROSXl4ZXdZSDQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDE0RWJYK1dYc04waytDMTFtOFBhSVhaWEo0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkVHUlRFNkFLIiwibWUiOnsiaWQiOiIyMzM1NTc1NjA5MTE6MTNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05pVTI1TUhFUDY0NWJvR0dBc2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImxwWkpTdWlIZkdZVXhxWWpxaFNMT3FTbEFWd08vSkdPMHhtZEZVTkR6bFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6InBhVUZjci96aVRCR3lkUlNyT2pjdmRyMVNVMjlJL2V1b3pqR01rN0hmT0YvTUVSQWFjUm1ja1diUXBBd29qZDM5SC90Q255TDU5b29KS3JpR3ZQNUJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJTazliYm1FamRYNjlrVGttNnV4MG9RN2xGbEFFcU5WcGZkUmFyTVozczJDUHZrYkN2QzFEd0wrODZ3RStpeEp4TGMvQU96Q3MyYUpwYnE5V2RRcTBDdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzU1NzU2MDkxMToxM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaYVdTVXJvaDN4bUZNYW1JNm9VaXpxa3BRRmNEdnlSanRNWm5SVkRRODVVIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMzOTA5NjQ0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1SZSJ9';

const prefix = process.env.PREFIX || '.';
const mycode = process.env.CODE || "233";
const author = process.env.STICKER_AUTHOR || 'Keith';
const packname = process.env.PACKNAME || 'keith';
const dev = process.env.DEV || '233557560911';
const DevKeith = dev.split(",");
const botname = process.env.BOTNAME || 'KEITH-MD';
const mode = process.env.MODE || 'private';
const gcpresence = process.env.GC_PRESENCE || 'false';
const antionce = process.env.ANTIVIEWONCE || 'true';
const sessionName = "session";
const presence = process.env.WA_PRESENCE || 'online';

const antitag = process.env.ANTITAG || 'true';
const antispam = process.env.ANTISPAM || 'true';
const chatbot = process.env.CHAT_BOT || 'true';
const antilink = process.env.ANTILINK || 'true';
const autoreact = process.env.AUTOREACT || 'true';
const antibot = process.env.ANTIBOT || 'true';
const anticall = process.env.ANTICALL || 'true';
const antibad = process.env.ANTI_BAD_WORD || 'true';
const antidelete = process.env.ANTIDELETE || 'true';
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
