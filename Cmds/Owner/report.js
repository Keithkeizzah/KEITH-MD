const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m, text, participants, pushname } = context;

        // Check if the text is provided, otherwise send a reply asking for the message
        if (!text) return m.reply("Provide a message!");

        // Developer numbers array (ensure to append @s.whatsapp.net for valid contact IDs)
        const devs = [
            '254748387615@s.whatsapp.net', 
            '254796299159@s.whatsapp.net', 
            '254110190196@s.whatsapp.net', 
            '254743995989@s.whatsapp.net'
        ];

        // Construct the message that will be sent to devs
        let txt = `❗MESSAGE (Keith) ❗\n\n🀄 Message: ${text}\n\nWritten by: ${pushname}`;

        // Send confirmation to the sender that the message is being delivered
        await m.reply("Your message has been delivered successfully...");

        // Loop through each developer and send the message
        for (let dev of devs) {
            try {
                // Send a forwarded message to each developer
                await client.sendMessage(dev, {
                    image: {
                        url: "https://files.catbox.moe/yldsxj.jpg"
                    },
                    mentions: participants.map(a => a.id),
                    caption: txt
                });
            } catch (error) {
                // Log any error that occurs when sending a message to the developer
                console.error(`Error sending message to ${dev}:`, error);
            }
        }

        // Confirm that the message has been sent to all developers
        await m.reply("Message sent to all developers.");
    });
};
