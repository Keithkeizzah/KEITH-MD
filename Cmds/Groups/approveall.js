 module.exports = async (context) => {
    const { client, m, chatUpdate, store, isBotAdmin, isAdmin } = context;

if (!m.isGroup) return m.reply("This command is meant for groups");
if (!isAdmin) return m.reply("You need admin privileges");
if (!isBotAdmin) return m.reply("I need admin privileges");

const responseList = await client.groupRequestParticipantsList(m.chat);

if (responseList.length === 0) return m.reply("there are no pending join requests at this time.");

for (const participan of responseList) {
    const response = await client.groupRequestParticipantsUpdate(
        m.chat, 
        [participan.jid], // Approve/reject each participant individually
        "approve" // or "reject"
    );
    console.log(response);
}
m.reply("all pending participants have been approved to join.");

};
