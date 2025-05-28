/*I wrote a script to automate my job. Now I just sit back and watch Netflix while it runs.*/

const session = process.env.SESSION || 'KEITH;;;H4sIAAAAAAAAA5VU25KiSBD9l3rVGFHuRnTEIiogilcUe2MfSiiwBAGrCrlM+O8btN3TEzG7s708FUmRec7Jk/kdpBmmyEY1GH4HOcF3yFB7ZHWOwBCMijBEBHRBABkEQ7AwFK1QkGrY8cEdObo1oLcjB6VqErrLpRwgJ3mV88Nslvov4NEFeXFKsP+bhNayZ94GhS+UZrFV91s7h5e55XL6TopW+3LesDC9eVZ6MbgX8GgzQkxwGk3yM7oiAhMb1SuIydfgX3W3VlS8Xe4uo5mg6s5aUBe7ZW3KGTefHTGWjkQem5XVF74GP8bT9J5w+fh85tz6SDr0ypVVv9O4wkA+b/wlJu6t8LbOZPKET3GUosAKUMowq7+su2Twsiiu+f6tQErnclyvpvpyqmmxmO4F7jKLT+LMuXSqg1l+Dbi3zXrj2aRcNU55tbNemtNgvfG2tlKdC7TCVSF5yIg0d0t/Br4iH16J/4/uhbZ3pLLexUKZ9gx7VOPBIucPo/BCzWARGqznVZFelRmvfA1+01xze+TYUjkmt63Arw5zOz7ZEJ2teXLyHXVu64cmRWcz+4QPWUF+h5IEnLcsb8i0w0R2YtKbFNRXrv4gJsV6epDRqL9xR56QM2my8DRJXOcao1rI91Y3SRmghSTumhvbH4XXexiv0GbkNNH65Y1RjGorAMP+owsIijBlBDKcpW1soHYBDO5b5BPE3tQF94l94u5nOzk23KHs9OY3y9Wj5rWTOptVhYT81t9cXk8ym7gvoAtykvmIUhSYmLKM1AtEKYwQBcM/3xrVcibomjE0wwEYAnXAc4qiDBRV4P6g38ozZBTm+bcUMdAFIcmuCwSGjBSoC95+GIylPi8PRgNRlEZjXuvLfUmXx6KmK6IiKnzL8PosusNXRBm85mDYlwVFkBReER5/dUGKKva0T0ua73dBiAllblrkSQaDD299fIS+nxUp29apr7cHRMCQ+wwjxnAa0ZZZkULin/Ed6S0PMAxhQtEPnRFBwQeX992hZ0Hb/vH6KI/M+Ri02NtEv2gzFMRf5UmeikiiKPEiPxBUQRHbi2388QNgmy9ADOKEgiHQ7UPB1GgysfCUpxPD0NxI0yMNfBL68OfTALxyO2SksGLXFdw7LlTZbEKBXb1FYe3Xnqdwdi/UfKjX1ss/JAFD0DeSbTYtZhfdmYT6JNd3y3G4RDRuTvuVlAbwemjgzjnIamUpR80Yh8tiL7hTYw6V6Xh/0uPOTZpv7ErlpwtBHcROeBlpL221AN2xj34u1gubjkTLi7Z3raU5mIlJb6eibVTLa/XuaByxnOosiqTuU/MA/Q1U6DHOgsg7vhKv2tMQd2ox0qVMqeJRahgNX5qX6Dk5b5ObvG9M/G5q/PYaYvS2gFLYNvC/W/cE3jqMe3R/yvG+0v5lLYyCnp3cbBnPptPldC6QO6oUvjN/TZo5nrrTfs/R73xpGhHF4NFaPU8gCzNyBUMA04BkOABdQLKitayVhtlviumaa2nvzBNImfY5Bv80Wdzz1opkuQnpue27LZxNofV0reX5lkH2MVVAa5+Zx8Djb6dxaWH3BwAA';

const prefix = process.env.PREFIX || '.';
const mycode = process.env.CODE || "92";
const author = process.env.OWNER_NAME || 'Keith';
const packname = process.env.PACKNAME || 'keith';
const dev = process.env.OWNER_NUMBER || '923088828940';
const DevKeith = dev.split(",");
const botname = process.env.BOTNAME || 'KEITH-MD';
const mode = process.env.MODE || 'public';
const gcpresence = process.env.GC_PRESENCE || 'tru';
const antionce = process.env.ANTIVIEWONCE || 'true';
const sessionName = "session";
const presence = process.env.WA_PRESENCE || 'recording';
const herokuapikey = process.env.HEROKU_API_KEY || '';
const herokuAppname = process.env.HEROKU_APP_NAME || '';
const url = process.env.URL || 'https://files.catbox.moe/mikdi0.jpg';
const gurl = process.env.GURL || 'https://chat.whatsapp.com/H8Hh2TnNL0S9QS0ASUpl1h';
const reactemoji = process.env.EMOJI || '🔗';
const antitag = process.env.ANTITAG || 'true';
const groupControl = process.env.GROUP_CONTROL || 'true';
const anticall = process.env.ANTICALL || 'true';
const antidelete = process.env.ANTIDELETE || 'true';
const antimention = process.env.ANTIMENTION || 'true';
const antibot = process.env.ANTIBOT || 'true';
const antilink = process.env.ANTILINK || 'true';
const antibad = process.env.ANTIBAD || 'true';
const autoview = process.env.AUTOVIEW_STATUS || 'true';
const autolike = process.env.AUTOLIKE_STATUS || 'true';
const chatbot = process.env.CHATBOT || 'false';
const greet = process.env.GREET || 'true';
const autodownloadstatus = process.env.AUTODOWNLOAD_STATUS || 'false';
const autostatusreply = process.env.AUTOREPLY_STATUS || 'true';
const autostatusmsg = process.env.AUTOSTATUS_MSG || 'viewed';
const greetmsg = process.env.GREET_MSG || 'my owner is unavailable text back later';
const timezone = process.env.TIMEZONE || 'Africa/Nairobi';
const autoread = process.env.AUTOREAD || 'true';
const permit = process.env.PM_PERMIT || 'true';
const voicechatbot = process.env.VOICECHATBOT || 'trul';
const voicechatbot2 = process.env.VOICECHATBOT2 || 't';
const anticallmsg = process.env.ANTICALL_MSG || 'Keith declined your 🤙 call';
const autobio = process.env.AUTOBIO || 'true';



module.exports = {
  sessionName,
  presence,
  autoview,
  autoread,
  autodownloadstatus,
  botname,
  voicechatbot,
  voicechatbot2,
  reactemoji,
  autobio,
  antilink: groupControl, // Use groupControl for antilink
  antibad: groupControl, // Use groupControl for antibad
  mode,
  prefix,
  anticall,
  autostatusreply,
  autostatusmsg,
  autolike,
  anticallmsg,
  mycode,
  chatbot,
  author,
  herokuAppname,
  herokuapikey,
  url,
  gurl,
  packname,
  dev,
  greet,
  greetmsg,
  DevKeith,
  gcpresence,
  permit,
  antionce,
  session,
  antitag,
  antidelete,
};
