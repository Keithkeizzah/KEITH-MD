module.exports = async (context) => {
    const { client, m, budy, Owner } = context;

    if (!Owner) {
        return m.reply("You need owner privileges to execute this command!");
    }

    try {
        await m.reply("*Restarting...*");

        // Add a delay function
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        await sleep(3000);  // Sleep for 3 seconds before restarting

        process.exit();  // Exit the process to restart the bot
    } catch (error) {
        console.error("Error during restart:", error);
    }
};
