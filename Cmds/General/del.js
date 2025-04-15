module.exports = async (context) => {
    const { client, m, prefix, sendReply, sendMediaMessage } = context;




if (!m.quoted) return sendReply(client, m, 'Quote a message sent by bot');

if (m.quoted && m.quoted.fromMe === false) {
  return sendReply(client, m, `I cannot delete other users' messages, you can still delete using ${prefix}delete command`);
}


await m.quoted.delete()
}
