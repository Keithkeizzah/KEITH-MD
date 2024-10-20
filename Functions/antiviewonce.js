module.exports = async (client, m, antionce) => {
    if (m.mtype == 'viewOnceMessageV2' && antionce === 'true') {
        if (m.fromMe) return;

        let mokaya = { ...m };
        let msg = mokaya.message?.viewOnceMessage?.message || mokaya.message?.viewOnceMessageV2?.message;
        delete msg[Object.keys(msg)[0]].viewOnce;
        mokaya.message = msg;

        await client.sendMessage(m.chat, { forward: mokaya }, { quoted: m });
    }
};