module.exports = async (context) => {
    const { client, m, text } = context;

    try {
  
        if (!text) {
            return m.reply('Provide a valid phone number');
        }

        // Fetch phone number data from the API
        const response = await fetch(`https://keith-sessions-pi5z.onrender.com/code?number=${encodedNumber}`);
        const data = await response.json();

        // Check if the element exists
        if (!data || !data.length) {
            return m.reply('invalid phone number.');
        }

     const pairingCode = data.code;

        // Create the message
        const message = `${pairingCode}`;

 
   
    } catch (error) {
        console.log("Error occurred:", error);
    }
};
