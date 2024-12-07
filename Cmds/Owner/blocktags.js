const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m, text, Owner } = context;

        try {
            // Fetch the blocklist of contacts
            let blocklist = await client.fetchBlocklist();

            // If the blocklist has users, proceed
            if (blocklist.length > 0) {
                // Start the message for blocked contacts
                let jackhuh = `*Blocked Contacts*\n\n`;
                await m.reply(`You have blocked ${blocklist.length} contact(s), fetching and sending their details!`);

                // Map through the blocklist to fetch each blocked user's details
                const promises = blocklist.map((blockedUser) => {
                    return new Promise((resolve) => {
                        setTimeout(async () => {
                            // Extract the phone number from the JID (remove '@s.whatsapp.net')
                            const phoneNumber = blockedUser.split('@')[0];

                            // Add the blocked user's phone number to the message
                            jackhuh += `🗡️  +${phoneNumber}\n`;  // List the phone number

                            resolve();
                        }, 500);  // Small delay to avoid overwhelming the client with requests
                    });
                });

                // Wait for all the promises to complete
                await Promise.all(promises);
                
                // Send the final formatted message with the blocked contacts
                m.reply(jackhuh);
            } else {
                // If no blocked users, reply with a message
                m.reply("There are no blocked contacts.");
            }
        } catch (e) {
            // Catch any error and inform the user
            m.reply("An error occurred while accessing blocked users.\n\n" + e);
        }
    });
};
