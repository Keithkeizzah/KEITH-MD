const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m, text, participants, pushname } = context;

        // Check if the text is provided, otherwise send a reply asking for the message
        if (!text) return m.reply("Provide a message!");

        // Developer numbers array
        const devs = ['254748387615', '254796299159', '2254110190196', '254743995989'];

        // Construct the message that will be sent to devs
        let txt = `❗MESSAGE (Keith) ❗\n\n🀄 Message: ${text}\n\nWritten by: ${pushname}`;

        // Send the message to the developer numbers only
        await m.reply("your message has been delivered successfully ...");

        for (let dev of devs) {
            try {
                // Send the report to each developer number in the 'devs' array
                await client.sendMessage(dev, {
                    image: {
                        url: "https://files.catbox.moe/yldsxj.jpg"
                    },
                    mentions: participants.map(a => a.id),
                    caption: txt
                });
            } catch (error) {
                // Handle potential errors when sending messages to devs
                console.error(`Error sending message to ${dev}:`, error);
            }
        }

        // Confirm that the message has been sent to the devs
        await m.reply("Message sent to all developers.");
    });
};
