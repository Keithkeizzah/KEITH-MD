const s = require("../settings");

module.exports = async (context) => {
    const { client, m } = context;
    const ownernumber = s.dev;

    try {
        await client.sendContact(m.chat, [ownernumber], m);
    } catch (error) {
        console.error('Error sending owner contact:', error);
        m.reply('Error sending owner contact.');
    }
};
