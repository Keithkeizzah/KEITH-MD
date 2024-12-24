const middleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await middleware(context, async () => {
        const { client, m, text } = context;

        let [pollName, pollOptions] = text.split(';');
        if (!pollOptions) {
            return await m.reply('Usage: poll question;option1,option2,option3.....');
        }

        let options = [];
        for (let option of pollOptions.split(',')) {
            if (option && option.trim() !== '') {
                options.push(option.trim());
            }
        }

        if (options.length < 2) {
            return await m.reply('Please provide at least two options for the poll.');
        }

        await client.sendMessage(m.chat, {
            poll: {
                name: pollName,
                values: options,
            },
        });
    });
};
