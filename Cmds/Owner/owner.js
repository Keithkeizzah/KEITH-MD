const s = require("../settings");  // Importing the settings file

module.exports = async (context) => {
    const { client, m } = context;
    const ownernumber = s.dev;  // Get the owner's number from the settings file

    try {
        await client.sendContact(m.chat, [ownernumber], m);  // Send the contact to the chat
    } catch (error) {
        console.error('Error sending owner contact:', error);
        m.reply('Error sending owner contact.');  // Notify the user if there is an error
    }
};
