const fetch = require('node-fetch'); 

module.exports = async (context) => {
    const { client, m, text, prefix } = context;

    // Ensure that the input text is provided
    if (!text) {
        return m.reply(`Example usage: ${prefix}nowa 2547483876xx`);
    }

    // Regex for matching phone number patterns
    const regex = /\d+/g;

    // Match the text to the regex and calculate the total combinations
    let random = (text.match(regex) || []).length;
    let total = Math.pow(10, random);

    let array = [];
    
    // Loop through all possible combinations
    for (let i = 0; i < total; i++) {
        // Generate the current list for the combination
        let list = [...i.toString().padStart(random, '0')];
        
        // Generate the WhatsApp number by replacing placeholders
        let result = text.replace(regex, () => list.shift()) + '@s.whatsapp.net';

        // Check if the number is registered on WhatsApp
        let exists = await client.onWhatsApp(result).then(v => (v[0] || {}).exists);

        if (exists) {
            // Fetch status for registered number
            let info = await client.fetchStatus(result).catch(() => {});
            array.push({ exists: true, jid: result, ...info });
        } else {
            array.push({ exists: false, jid: result });
        }
    }

    // Prepare the response message
    let txt = 'Registered\n\n';

    // Add registered users to the message
    txt += array
        .filter(v => v.exists)
        .map(
            v => `• Link: wa.me/${v.jid.split('@')[0]}\n*• Bio:* ${v.status || 'No description'}\n*• Set on:* ${formatDate(v.setAt)}`
        )
        .join('\n\n');

    // Add a section for not registered users
    txt += '\n\n*Not registered*\n\n';
    txt += array
        .filter(v => !v.exists)
        .map(v => v.jid.split('@')[0])
        .join('\n');

    // Send the response message
    m.reply(txt);
};

// Helper function to format the date
function formatDate(n, locale = 'en') {
    let d = new Date(n);
    return d.toLocaleDateString(locale, { timeZone: 'Africa/Nairobi' });
}
