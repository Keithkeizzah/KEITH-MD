const truecallerjs = require('truecallerjs');
const { SearchData, Format } = truecallerjs;

module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        // Check if there's no input text (i.e., the phone number)
        if (!text) return m.reply("Please provide a phone number to search.");

        // Validate the phone number (you can modify this regex based on your needs)
        const phoneNumberRegex = /^\d{10}$/;
        if (!phoneNumberRegex.test(text)) {
            return m.reply("Invalid phone number format. Please provide a valid 10-digit phone number.");
        }

        // Set up search data for Truecaller
        const searchData = {
            number: text, // User-provided phone number
            countryCode: "KE", // Country code (IN for India in this case)
            installationId: "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug", // Your installation ID
        };

        // Perform the Truecaller search
        const response = await truecallerjs.search(searchData);

        // Check if the response contains valid data
        if (response) {
            // Log the response for debugging purposes
            console.log(response.json());

            // Send the response to the user
            const name = response.getName() || "Name not found";
            const alternateName = response.getAlternateName() || "Alternate name not found";
            const email = response.getEmailId() || "Email not available";
            const addresses = response.getAddresses() || "Addresses not found";

            // Construct a message to send to the user with the search results
            const resultMessage = `
                **Name**: ${name}
                **Alternate Name**: ${alternateName}
                **Email**: ${email}
                **Addresses**: ${JSON.stringify(addresses)}
            `;

            await m.reply(resultMessage); // Send the result message to the user
        } else {
            await m.reply("No information found for this number.");
        }

    } catch (error) {
        console.error("Error occurred:", error.message);
        await m.reply("An error occurred while performing the search. Please try again.");
    }
};
