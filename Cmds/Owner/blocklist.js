const middleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, text } = context;

		const blocklist = await message.client.fetchBlocklist();
		if (blocklist.length > 0) {
			const mentions = blocklist.map(number => `${number}`);
			const formattedList = blocklist.map(number => `• @${number.split('@')[0]}`).join('\n');
			await m.reply(`*_Blocked contacts:_*\n\n${formattedList}`, { mentions });
		} else {
			await m.reply('_No blocked Numbers!_');
		}
	},
);
   
