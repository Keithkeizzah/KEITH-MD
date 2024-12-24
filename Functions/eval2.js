module.exports = async (client, m, Owner, budy, fetchJson) => {
const util = require("util");

if (budy && budy.startsWith('$')) { 
   if (!Owner) return m.reply `you need owner permission or my dev Keithkeizzah to execute this command 🚫` 
   function Return(sul) { 
 sat = JSON.stringify(sul, null, 2) 
 bang = util.format(sat) 
   if (sat == undefined) { 
  bang = util.format(sul) 
   } 
   return m.reply(bang) 
   } 
   try { 
 m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`))) 
   } catch (e) { 
 m.reply(String(e)) 
   } 
    } 

}
