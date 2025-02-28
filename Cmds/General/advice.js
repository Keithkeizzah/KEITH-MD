const advice = require("badadvice");

module.exports = async (context) => {
        const { client, m, sendReply, sendMediaMessage } = context;
await sendReply(client, m,advice());

}
