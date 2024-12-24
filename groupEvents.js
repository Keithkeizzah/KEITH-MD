const events = process.env.EVENTS || 'false';
const botname = process.env.BOTNAME || 'KEITH-MD';

const Events = async (client, keizzah) => {
    const Myself = await client.decodeJid(client.user.id);

    try {
        let metadata = await client.groupMetadata(keizzah.id);
        let participants = keizzah.participants;
        let desc = metadata.desc || "No Description";

        for (let num of participants) {
            let dpuser;

            try {
                dpuser = await client.profilePictureUrl(num, "image");
            } catch {
                dpuser = "https://i.imgur.com/iEWHnOH.jpeg";
            }

            if (keizzah.action == "add") {
                let userName = num;

                let Welcometext = ` Hey  @${userName.split("@")[0]} 👋\n\nWelcome to ${metadata.subject}.\n\nyou may read the group Description to avoid being removed  ${desc}\n\n*Regards keithkeizzah*.\n\nPowered by ${botname} .`;
                if (events === 'true') {
                    await client.sendMessage(keizzah.id, {
                        image: { url: dpuser },
                        caption: Welcometext,
                        mentions: [num],
                    });
                }
            } else if (keizzah.action == "remove") {
                let userName2 = num;

                let Lefttext = `
          Goodbye to this idiot @${userName2.split("@")[0]} you will be highly remembered comrade`;
                if (events === 'true') {
                    await client.sendMessage(keizzah.id, {
                        image: { url: dpuser },
                        caption: Lefttext,
                        mentions: [num],
                    });
                }
            } else if (keizzah.action == "demote" && events === 'true') {
                await client.sendMessage(
                    keizzah.id,
                    {
                        text: `@${(keizzah.author).split("@")[0]}, has demoted @${(keizzah.participants[0]).split("@")[0]} from admin 👀`,
                        mentions: [keizzah.author, keizzah.participants[0]]
                    }
                );
            } else if (keizzah.action == "promote" && events === 'true') {
                await client.sendMessage(
                    keizzah.id,
                    {
                        text: `@${(keizzah.author).split("@")[0]} has promoted @${(keizzah.participants[0]).split("@")[0]} to admin. 👀`,
                        mentions: [keizzah.author, keizzah.participants[0]]
                    }
                );
            }
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = Events;
