module.exports = async (context) => {
        const { client, m, sendReply, sendMediaMessage } = context;


const  { TempMail } = require("tempmail.lol");

const tempmail = new TempMail();

      const inbox = await tempmail.createInbox();
      const emailMessage = `${inbox.address}`;

await sendReply(client, m, emailMessage);


const mas = await sendMediaMessage(client, m, { text: `${inbox.token}` });
      


      
await await sendMediaMessage(client, m, { text: `Quoted text is your token. To fetch messages in your email use <.tempinbox your-token>`}, { quoted: mas});



}

