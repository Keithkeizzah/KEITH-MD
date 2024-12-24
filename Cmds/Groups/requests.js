const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
  try {
    await middleware(context, async () => {
      const { client, m } = context;

      // Fetch the list of pending join requests
      const pendingRequests = await client.groupRequestParticipantsList(m.chat);

      // If no pending requests, inform the user
      if (pendingRequests.length === 0) {
        return m.reply("There are no pending join requests for this group.");
      }

      // Reject each pending join request
      const rejectionPromises = pendingRequests.map(async (request) => {
        const rejectionResult = await client.groupRequestParticipantsUpdate(m.chat, [request.jid], "reject");
        console.log(rejectionResult); // Log the rejection result
      });

      // Wait for all rejections to complete
      await Promise.all(rejectionPromises);

      // Notify the user that all requests have been rejected
      return m.reply("All pending join requests have been rejected.");
    });
  } catch (error) {
    console.error("Error processing the join requests:", error);
    m.reply("An error occurred while rejecting the join requests.");
  }
};
