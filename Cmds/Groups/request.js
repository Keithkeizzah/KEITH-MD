const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;

          // Fetch the list of pending join requests
  const pendingRequests = await client.groupRequestParticipantsList(m.chat);

  // If no pending requests
  if (pendingRequests.length === 0) {
    m.reply("There are no pending join requests for this group.");
    return;
  }

  // Reject each pending join request
  for (const request of pendingRequests) {
    const rejectionResult = await client.groupRequestParticipantsUpdate(m.chat, [request.jid], "reject");
    console.log(rejectionResult);
  }

  // Notify that all requests have been rejected
  m.reply("All pending join requests have been rejected.");
});
