module.exports = async (client, m, gcpresence) => {
    if (m.isGroup && gcpresence === 'true') {
        let keithrecordin = ['recording', 'composing'];
        let keithrecordinfinal = keithrecordin[Math.floor(Math.random() * keithrecordin.length)];
        await client.sendPresenceUpdate(keithrecordinfinal, m.chat);
    }
};
