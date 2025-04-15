const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m, text, url, pushname } = context;

        if (!text) return m.reply("Provide a  message to send to the developer contacts!");
        
        // Developer contacts
        const developerContacts = [
            '254748387615@s.whatsapp.net',
            '254796299159@s.whatsapp.net',
            '254110190196@s.whatsapp.net'
        ];

        await m.reply("Sending yor report message...");

        for (let contact of developerContacts) {
            let txt = `❗REPORT MESSAGE ❗\n\n🀄 Message: ${text}\n\nWritten by: ${pushname}`;

            await client.sendMessage(contact, {
                image: {
                    url: url
                },
                caption: txt
            });
        }
        
        await m.reply("Message sent to all developer contacts.");
    });
}
