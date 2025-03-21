/*I wrote a script to automate my job. Now I just sit back and watch Netflix while it runs.*/

const session = process.env.SESSION || 'KEITH;;;H4sIAAAAAAAAA5VUW5OqOBj8L3nFOXJVsGqqFhAvqFwUvG1tbUWIErmaAIpT/vctxjk187Dn7OxbKpBOp7/ufgNZjimaoQYM3kBBcA1L1C7LpkBgALTqeEQEdEAISwgGwJ0spjctui8Uad5L/InNmpM1rJaik/cZTNkJPByEEUzIOn4Fjw4oqkOCg98Ayql/XupGl+z5RUDsm+ar1fTk0zmzv4lqjo/5tJxgcdxs/FfwaBEhJjg7GUWEUkRgMkONAzH5Hn1keZdlzNjDWI/d7pqWk/E8Xp6bw1bsbY5ur9kktbYa3vY++z36CtFCvi/J5nxjjLcxtNxGmMC42BLrNkRLNjtol5BlTYV1n/QpPmUonIYoK3HZfFv3qWGe75bHmCi9F/Mewesojgwr9ll5bpv7I8Pei6WumBdj8T3icOKSGcozW/Yqz6fmBab5YurFwjDZi0KcBQXi+C6X5Df6lbhDfnol/j+6r6aBt436niEjNjZrvK4W517BZ/zINGVqWqEBldhxNXm8+x79cYNTAnvDGUnGknk218qk3xVEf3/bXNecSkaMlNY6DGTO/6QPy4r8juXivhGikhhLZ15btjDabfhkRGtGc/W1H6Kbak9s5hQHMzMWKbzT7co+bbd1dlDUVZW6nHkqk6U5yjg8jKNM6x7WjjS8vr6/KEbNNAQD7tEBBJ0wLQkscZ61e7zIdgAM6xUKCCrf5QUotQ9V0kszw3edjOlnaqy7FKWKyxvCylO8UsjFWFa5bvAKOqAgeYAoReEE0zInzQJRCk+IgsGff3VAhm7lc3DtdQLXAUdMaOlnVZHkMPw51Z8fYRDkVVaumizQ2wUiYMB+bqOyxNmJtjpWGSRBhGukR7CkYHCECUWPDghRjQPU4gH5PD7M/o5Gq8mLd2k4FPuzYnJtKUd59vwlOIQsVKTg5cgi5UWUIHyBiGdfAvkYsiHLcZIQgg7AH5lpz/xyhOawCPJqtA+78sw5YC6cXYSlywfQeebiqT0iKASDklSoAw4wiKvCy2OU/QZXVTS8kVzZ1reJlGoh5jcHuR5Rq8y/4D5nCgZvnz2l52GL56meJSxXQ9AB6bsFcftyXhAkQer1FUERBxL7B/1xbYWERfEjQ2WL+yF6eyJEJcQJBQOgz4ZNVLsTY35M5L44HmvGSdVPKvgc0k+3P93U0IUEE2gb50s21wNW0SyL35FTQKvLQryOIvnsqCN3xwjq67+AgAGw8cLtnTPIsXpY7y+OavhefT0EeM8M6ZBd2uP6splWzrX0xfnpMu05PjZOpqFIM/5wM2Rn22PG0T2LJE7PBTrO8h3W1df2tqdZvl7G75ey5ghxr16O2Y2UOMx5em821m7WteB8xzBbHrHSWTEaSRFh2Bj79flo2itP3t+Z1W229Rqao8h3R0PbmNmFVlmK5j5z+N4DyUf/4veEvH1Y64jRe51lMEX/PZyvLmcfnS8YHwX5CydpARnam2Jzjqa9orlmluN6XpjOxMl8fjnbC213nN6vmj92yit4PP7qgCKB5TEnadvaWUhy3KYhgbRUP4Pq4RTREqYFGHB9kZcEQeB6j38A0TEIsN4HAAA=';

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
const antibot = process.env.ANTIBOT || 'true';
const autoview = process.env.AUTOVIEW_STATUS || 'true';
const autolike = process.env.AUTOLIKE_STATUS || 'true';
const chatbot = process.env.CHATBOT || 'true';
const greet = process.env.GREET || 'true';
const autodownloadstatus = process.env.AUTODOWNLOAD_STATUS || 'true';
const autostatusreply = process.env.AUTOREPLY_STATUS || 'true';
const autostatusmsg = process.env.AUTOSTATUS_MSG || 'viewed';
const greetmsg = process.env.GREET_MSG || 'text back later';
const timezone = process.env.TIMEZONE || 'Africa/Nairobi';
const autoread = process.env.AUTOREAD || 'true';
const permit = process.env.PM_PERMIT || 'true';
const voicechatbot = process.env.VOICECHATBOT || 'true';
const voicechatbot2 = process.env.VOICECHATBOT2 || 'true';
const anticallmsg = process.env.ANTICALL_MSG || 'Keith declined your 🤙 call';
const autobio = process.env.AUTOBIO || 'false';

const { Sequelize } = require('sequelize'); // Ensure Sequelize is imported

const DATABASE_URL = process.env.DATABASE_URL || './database.db'; // Define DATABASE_URL properly

const database =
  DATABASE_URL === './database.db'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
      })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
          ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
      });

module.exports = {
  sessionName,
  presence,
  autoview,
  autoread,
  database,
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
