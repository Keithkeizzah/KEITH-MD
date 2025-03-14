const TEMPNUMBER_API_URL = 'https://keith-api.vercel.app/api/tempnumber';
const TEMPNUMBER_CODE_API_URL = 'https://keith-api.vercel.app/api/tempnumbercode';

module.exports = async (context) => {
    const { client, m } = context;

    try {
        // Fetch tempnumber data
        const tempNumberResponse = await fetch(TEMPNUMBER_API_URL);
        if (!tempNumberResponse.ok) throw new Error('Failed to fetch tempnumber data');
        const { result: tempNumbers } = await tempNumberResponse.json();

        // Pick a random temp number
        const randomTempNumber = tempNumbers[Math.floor(Math.random() * tempNumbers.length)];

        // Fetch tempnumber code for the selected number
        const tempNumberCodeResponse = await fetch(TEMPNUMBER_CODE_API_URL, {
            method: 'POST', // Assuming this requires a POST request
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number: randomTempNumber.number })
        });

        const tempNumberCodeData = await tempNumberCodeResponse.json();

        // Build the message
        let message = '┏━━ 🎉 *TEMP NUMBER DETAILS* 🎉 ━━◆\n';
        message += `
┃ *Country:* ${randomTempNumber.country}
┃ *Number:* ${randomTempNumber.number}
┃ *Link:* [View SMS](${randomTempNumber.link})
`;
        if (tempNumberCodeData.status && tempNumberCodeData.code) {
            message += `┃ *Code:* ${tempNumberCodeData.code}\n`;
        } else {
            message += '┃ *Code:* Not available\n';
        }
        message += '╰───────────────◆';

        // Send the message
        await client.sendMessage(m.chat, { text: message }, { quoted: m });

    } catch (error) {
        console.error('Error:', error);
        await client.sendMessage(m.chat, { text: 'An error occurred while fetching the temp number or its code.' }, { quoted: m });
    }
};
