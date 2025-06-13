/*I wrote a script to automate my job. Now I just sit back and watch Netflix while it runs.*/

const session = process.env.SESSION || '';

const prefix = process.env.PREFIX || ',';
const author = process.env.OWNER_NAME || 'Keith';
const packname = process.env.PACKNAME || 'keith';
const dev = process.env.OWNER_NUMBER || '255794469700';
const DevKeith = dev.split(",");
const botname = process.env.BOTNAME || 'KEITH-MD';
const mode = process.env.MODE || 'public';
const sessionName = "session";
const url = process.env.URL || 'https://files.catbox.moe/mikdi0.jpg';
const gurl = process.env.GURL || 'https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47';
const timezone = process.env.TIMEZONE || 'Africa/Nairobi';
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
  timezone,
  author,  
  url,
  gurl,
  packname,
  dev,
  DevKeith,  
  session,
};
