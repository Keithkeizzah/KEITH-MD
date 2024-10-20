module.exports = async (context) => {
        const { client, m } = context;


const  { TempMail } = require("tempmail.lol");

const tempmail = new TempMail();

      const inbox = await tempmail.createInbox();
      const emailMessage = `${inbox.address}`;

await m.reply(emailMessage);


const mas = await client.sendMessage(m.chat, { text: `${inbox.token}` });
      


      
await client.sendMessage(m.chat, { text: `Quoted text is your token. To fetch messages in your email use <.tempinbox your-token>`}, { quoted: mas});



}

