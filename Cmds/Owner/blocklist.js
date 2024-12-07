const middleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m } = context;

        try {
            const blocklist = await client.fetchBlocklist();
            if (blocklist.length > 0) {
                const mentions = blocklist.map(number => `${number}`);
                const formattedList = blocklist.map(number => `• @${number.split('@')[0]}`).join('\n');
                await m.reply(`*_Blocked contacts:_*\n\n${formattedList}`, { mentions });
            } else {
                await m.reply('_No blocked Numbers!_');
            }
        } catch (error) {
            console.error('Error fetching blocklist:', error);
            await m.reply('_An error occurred while fetching the blocklist._');
        }
    });
};
