const middleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    try {
        await middleware(context, async () => {
            const { client, m, text } = context;

            if (!text) {
                return m.reply('_Please provide a new name._');
            }

            // Update the WhatsApp name
            await client.updateName(text);
            return m.reply('_WhatsApp name updated!_');
        });
    } catch (error) {
        console.error('Error updating WhatsApp name:', error);
        context.m.reply('_There was an error updating the name. Please try again later._');
    }
};
