const middleware = require('../../utility/botUtil/middleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, args, participants, text, sendReply, sendMediaMessage } = context;






await sendMediaMessage(client, m, { text : text ? text : '☞︎︎︎ TAGGED ☜︎︎︎' , mentions: participants.map(a => a.id)}, { quoted: m });

});

}

