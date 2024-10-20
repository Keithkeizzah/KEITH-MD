

module.exports = async (client, m, gcpresence) => {
    if (m.isGroup && gcpresence === 'true') {
        let dreadrecordin = ['recording', 'composing'];
        let dreadrecordinfinal = dreadrecordin[Math.floor(Math.random() * dreadrecordin.length)];
        await client.sendPresenceUpdate(dreadrecordinfinal, m.chat);
    }
};