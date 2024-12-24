module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        // Check if an element name was provided
        if (!text) {
            return m.reply('Provide an element name to get its details');
        }

        // Fetch element data from the API
        const response = await fetch(`https://api.popcat.xyz/periodic-table?element=${text}`);
        const data = await response.json();

        // Check if the element exists
        if (!data || !data.name) {
            return m.reply('Element not found. type elementlist to check all periodic elements.');
        }

        // Extract element information
        const name = data.name;
        const symbol = data.symbol;
        const atomicNumber = data.atomic_number;
        const atomicMass = data.atomic_mass;
        const period = data.period;
        const phase = data.phase;
        const summary = data.summary;
        const imageUrl = data.image; // Assuming the image URL is in the response

        // Create the message
        const message = `Here is Keith Md element.If you want to check on more elements type *elementlist* to get all periodic table for all elements.\n\n\n\n*KEITH-MD ELEMENT*\n\nname: ${name}\n\nSymbol: ${symbol}\n\nAtomic Number: ${atomicNumber}\n\nAtomic Mass: ${atomicMass}\n\nPeriod: ${period}\n\nPhase: ${phase}\n\nSummary: ${summary}`;

        // Send the message with the element's image
        await client.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { quoted: m });

    } catch (error) {
        console.log("Error occurred:", error);
    }
};
