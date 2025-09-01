/*I wrote a script to automate my job. Now I just sit back and watch Netflix while it runs.*/
const fs = require('fs-extra');

const path = require('path');

if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}
const session = process.env.SESSION || '';

const prefix = process.env.PREFIX || '.';

const author = process.env.OWNER_NAME || 'Hillary';

const packname = process.env.PACKNAME || 'Hillary⁩;

const dev = process.env.OWNER_NUMBER || '254740277957';

const DevKeith = dev.split(",");

const antibot = process.env.ANTIBOT || 'true';

const botname = process.env.BOTNAME || 'HILLARY-MD';

const mode = process.env.MODE || 'public';

const sessionName = "session";

const url = process.env.URL || 'https://telegra.ph/file/f27136b9297d7452f3fbc.jpg';

const gurl = process.env.GURL || 'https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47';

const timezone = process.env.TIMEZONE || 'Africa/Nairobi';

//fo mega users only
const megaEmail = process.env.MEGA_EMAIL || '';
const megaPassword = process.env.MEGA_PASSWORD || '';

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
  database,  
  botname, 
  mode,
  prefix,
megaEmail,
 megaPassword,
  timezone,
  author,  
  url,
  gurl,
  antibot,
  packname,
  dev,
  DevKeith,  
  session,
};
