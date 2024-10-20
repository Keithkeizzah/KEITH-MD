const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;


const response = await client.groupRequestParticipantsList(m.chat);

if (response.length === 0) return m.reply("There are no pending join requests.");

let jids = ''; 

response.forEach((participant, index) => {
    jids +='+' + participant.jid.split('@')[0];
    if (index < response.length - 1) {
        jids += '\n'; 
    }
});

 client.sendMessage(m.chat, {text:`Pending Participants:- 🕓\n${jids}\n\nUse the command .approve-all or .reject-all to approve or reject these join requests.`}, {quoted:m}); 


})

}