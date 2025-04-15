 module.exports = async (context) => {
    const { client, m, chatUpdate, store, isBotAdmin, isAdmin, sendReply, sendMediaMessage } = context;

if (!m.isGroup) return sendReply(client, m, "This command is meant for groups");
if (!isAdmin) return sendReply(client, m, "You need admin privileges");
if (!isBotAdmin) return sendReply(client, m, "I need admin privileges");

const responseList = await client.groupRequestParticipantsList(m.chat);

if (responseList.length === 0) return sendReply(client, m, "there are no pending join requests at this time.");

for (const participan of responseList) {
    const response = await client.groupRequestParticipantsUpdate(
        m.chat, 
        [participan.jid], 
        "approve" 
    );
    console.log(response);
}
sendReply(client, m, "all pending participants have been approved to join.");

};
