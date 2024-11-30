const s = require("../settings")
const fs = require('fs');
const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware')

// This middleware ensures the command can only be run by the bot owner
module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        // You can add logic here if needed
    }, async (client, context) => {
        const { m, Owner, pushname, text } = context;

        // Validate user input and respond accordingly
        if (!text[0]) {
            return m.reply('Instructions:\n\nType "anticll yes" to enable or "anticall no" to disable.');
        }

        const option = text.join(' ').toLowerCase();
        let responseMessage = '';

        switch (option) {
            case "yes":
                s.autoread = 'true';  // Enable Auto-Read
                responseMessage = 'Auto-read has been enabled.';
                break;

            case "no":
                s.autoread = 'false';  // Disable Auto-Read
                responseMessage = 'Auto-read has been disabled.';
                break;

            default:
                return m.reply("Please don't invent an option. Type 'autoread yes' or 'autoread no'.");
        }

        // Update the settings file with the new autoread value
        const settingsContent = JSON.stringify(s, null, 2); // Convert to JSON with indentation
        fs.writeFileSync('./settings.js', settingsContent, 'utf-8');  // Writing the updated settings back to the file

        // Send the response message to the user
        try {
            await client.sendMessage(m.chat, { text: responseMessage }, { quoted: m });
        } catch (error) {
            console.error("Error processing your request:", error);
            await client.sendMessage(m.chat, { text: 'Error processing your request.' }, { quoted: m });
        }
    });
};
