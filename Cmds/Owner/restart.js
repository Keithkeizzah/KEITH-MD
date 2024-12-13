const { exec } = require("child_process");

module.exports = async (context) => {
    const { client, m, budy, Owner } = context;

    // Ensure the owner is defined and has privileges
    if (!Owner) {
        return m.reply("You need owner privileges to execute this command!");
    }

    try {
        // Notify about the restart
        await m.reply("*Restarting...*");
        
        // Adding delay before restarting (1 second delay)
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        // Execute the restart command using pm2
        exec("pm2 restart all", (error, stdout, stderr) => {
            if (error) {
                console.error(`Error restarting PM2: ${error}`);
                return m.reply(`Error restarting PM2: ${error.message}`);
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return m.reply(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
            m.reply("Restart completed successfully!");
        });
    } catch (error) {
        console.error(error);
        m.reply(`An error occurred: ${error.message}`);
    }
};
