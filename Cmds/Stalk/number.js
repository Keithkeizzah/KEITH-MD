module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        // Check if the phone number was provided
        if (!text) {
            return m.reply('Please provide a valid phone number with the country code.');
        }

        // Set the reference for the API call
        const phoneNumber = encodeURIComponent(text);

        // Fetch phone data from the API
        const response = await fetch(`https://tajammalmods.xyz/Validater.php?num=${phoneNumber}`);
        
        // Check if the response is ok
        if (!response.ok) {
            return m.reply('Failed to fetch data. Please try again later.');
        }

        const data = await response.json();

        // Check if the data is valid
        if (!data || !data.valid) {
            return m.reply('Invalid phone number. Please check and try again.');
        }

        const { carrier, country, international_format, national_format, line_type, location, time_zones } = data;
        const lineType = line_type === 1 ? "Mobile" : "Landline";
        const timeZone = time_zones[0] || 'N/A';

        // Create the message
        const message = `𝗞𝗘𝗜𝗧𝗛 𝗠𝗗 𝗡𝗨𝗠𝗕𝗘𝗥 𝗦𝗧𝗔𝗟𝗞\n\n*Carrier:* ${carrier}\n*Country:* ${country}\n*International Format:* ${international_format}\n*National Format:* ${national_format}\n*Line Type:* ${lineType}\n*Location:* ${location}\n*Time Zone:* ${timeZone}`;

        // Send the message
        await client.sendMessage(m.chat, { text: message }, { quoted: m });

    } catch (error) {
        console.error("Error occurred:", error);
        m.reply('An error occurred while fetching the data. Please try again later.\n' + error);
    }
};
