module.exports = async (context) => {
    const { client, m, text } = context;

const { G4F } = require("g4f"); 
if (!text) return m.reply("What's your question ?");

try {


const GPT = new G4F(); 

const messages = [
        { role: "system", content: "You're a whatsapp bot called Dreaded AI that processes users text and accepts commands. You work courtesy of bing from Microsoft."},
        { role: "user", content: text}
];


GPT.chatCompletion(messages)
  .then(result => {
   
    m.reply(result);
  });

} catch (e) {
console.log(e);

 m.reply("Error occured") }



}