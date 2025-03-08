// Bot settings

// You don't have to set this if you deploy using heroku because you can simply set them in environment variables, also don't forget to sleep

const session = process.env.SESSION || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU1XdEx5bG5mdm11Wng5TVJpT0tkMEFscDU1bkwwTDZJRkRnZEtWUXQybz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTE01U3ZLTURtWjdxQ21PeS92bHlWQnZ2SXpVRlpRRUFuN01wT0pyOWFRYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTEs3VjFaeFNOVzJZRXRYNzlOY1p0QnJITmdsOGdqK0xFVzUveTZxN0dzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyR0FCU003NjBCRHg5Wkl6NGlLcFdaOGgyS25KVnEwRzVuWW51VGV2aGlrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZDRmNjNTZSVmw3Y0g3YTZIWmVvbk55bXYrZjZoWWl1eEFXTlhBWUEwR1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxPcEtMNXdBRHExK3VXRkdLY2tQMFZremxENEduUEw1MHVVRlMvQ0ZmUTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOENWZFdOVmgrK0dBWG5rS041RWhVT0FkcisvTnZHZVpPbHRCTzhZVjdIST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYXd3d2txaVFSL3ltN1hyeHVEa0NPNkU5Mys2UVY5RlE3aHRRVXliUDZuOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjROdm9NRVVKTTducmNvMm9rdHUrUVpaellyWG1HZmVSQkhCUUZjbWRzYVN3NUZ0cHlQd3ZsTG92elVkV2ZuZW42d0RxcWZ3RGZ6dUI5WWU5c2ZOeURnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTgsImFkdlNlY3JldEtleSI6IkN1MXNlWVA5MDhXQUtIMTQxNU80cFA2OHR6bUlldHFDYXQ3UjFDVDlDb3c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ii01VU1PdktzVExDX0tmQTVsTDM4Q3ciLCJwaG9uZUlkIjoiM2Y3MGQwMTYtY2Y0YS00YTIyLWI3NDUtYWE2OTkwMDZkNDA1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZJUnZFbWw5Rm9yeGdVb3FBbWowL1Nhbno1az0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIYmdXTkd1WFRtWGJYNlZJd2FaTGx2OUt3eDA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQ1RQOFIzQjIiLCJtZSI6eyJpZCI6IjYwMTExNzUwODUyNTo3MUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTy9Oa0tnRUVNUzZycjRHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZkFOUnFVOEFXK0NxaGxVZXIybmhrRVIrR2pPOSt3Ym9vYndkVm5URTBGRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQ1JJNk4rRHJENEdPanE2bjRQc01WbXhGOEFKMWtSWHFJQnRUR0Y5QjNJc1ZMWENHK1hMVzQrbTdsQmxONFo5VzNxU01zQitnMFBTQTlZRFJ3Vy83QkE9PSIsImRldmljZVNpZ25hdHVyZSI6IkhxL3VZbFN4K1gyWmxQNGswQU5uQ0FSdEV6cGduVUc2d2RDT2R4Qm5tVlVoeWNURDNnRjQxTVF2NGFNMDU4NUsyZkRMUWhSK1JRUTd0VTZ1UW1oNUJnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNjAxMTE3NTA4NTI1OjcxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlh3RFVhbFBBRnZncW9aVkhxOXA0WkJFZmhvenZmc0c2S0c4SFZaMHhOQlIifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDEzOTczMzAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTHlVIn0=';

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
