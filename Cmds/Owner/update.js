const { exec } = require("child_process");

module.exports = async (context) => {
    const { client, m, budy, Owner } = context;

    // Ensure that only the owner can execute this command
    if (!Owner) {
        return m.reply("You need owner privileges to execute this command!");
    }

    try {
        // Inform the user that the bot is restarting and updating
        await m.reply("*Restarting and updating...*");

        // Sleep function to delay the restart process
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        // Wait for 3 seconds before starting the update
        await sleep(3000);

        // Pull the latest updates from the repository
        exec("git pull origin main", { cwd: "./" }, (err, stdout, stderr) => {
            if (err) {
                console.error("Error pulling updates:", err);
                return m.reply("Failed to update the bot. Please check the logs.");
            }

            if (stderr) {
                console.error("Error pulling updates (stderr):", stderr);
                return m.reply("Failed to update the bot. Please check the logs.");
            }

            // Successfully pulled updates
            console.log("Update successful:", stdout);

            // Restart the bot
            process.exit();  // This will restart the bot after update
        });
    } catch (error) {
        console.error("Error during restart and update:", error);
        m.reply("An error occurred while updating the bot.");
    }
};
