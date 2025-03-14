const cheerio = require("cheerio");
const axios = require("axios");

// Fetch temporary numbers
async function fetchTempNumbers() {
    const url = 'https://receive-smss.com/';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const numbers = [];
    $("div.number-boxes > div").each((_, element) => {
        const country = $(element).find("div.number-boxes-item-country.number-boxess-item-country").text().trim();
        const number = $(element).find("div.number-boxes-itemm-number").text().trim();
        const link = `https://receive-smss.com${$(element).find("a").attr("href")}`;
        numbers.push({ country, number, link });
    });

    return numbers;
}

// Fetch temporary number codes
async function fetchTempNumberCodes(query) {
    const url = `https://receive-smss.com/sms/${query}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const info = {
        name: $("div.header-back-container > div > div > div > div > h3").text().trim(),
        number: $("span > div > a").text().trim(),
        image: $("div > img").attr("src")
    };

    const codes = [];
    $("div > div.row.message_details").each((_, element) => {
        const message = $(element).find("div.col-md-6.msgg > span").text().trim();
        const sender = $(element).find("div.col-md-3.senderr > a").text().trim();
        const time = $(element).find("div.col-md-3.time").text().replace(/Time/g, '').trim();
        codes.push({ message, sender, time });
    });

    return { info, codes };
}

// Main function to handle the module export
module.exports = async (context) => {
    const { client, m } = context;

    try {
        // Fetch temporary numbers
        const numbers = await fetchTempNumbers();
        if (!numbers.length) throw new Error('No temporary numbers found.');

        // Select the first number for demonstration
        const { number, link } = numbers[0];
        const query = link.split('/').pop(); // Extract query from link

        // Fetch codes for the selected number
        const { info, codes } = await fetchTempNumberCodes(query);
        if (!codes.length) throw new Error('No codes found for the selected number.');

        // Format the message
        const lineMessage = `
┏━━ 🎉 *TEMPNUMBER* �━━◆
┃
┃   *◇* ${info.number}
┃
┃   *Codes:*
${codes.map((code, index) => `┃   ${index + 1}. ${code.message} (${code.sender}) - ${code.time}`).join('\n')}
┃
╰───────────────◆
        `;

        // Send the message
        await client.sendMessage(m.chat, { text: lineMessage }, { quoted: m });
    } catch (error) {
        console.error('Error:', error);
        await client.sendMessage(m.chat, { text: 'An error occurred while fetching the data.' }, { quoted: m });
    }
};
