const events = process.env.EVENTS || 'false';
const botname = process.env.BOTNAME || 'KEITH-MD';

const getContextInfo = (m) => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363266249040649@newsletter',
            newsletterName: 'Keith Support',
            serverMessageId: 143,
        },
    };
};

const Events = async (client, keizzah) => {
    const Myself = await client.decodeJid(client.user.id);

    try {
        let metadata = await client.groupMetadata(keizzah.id);
        let participants = keizzah.participants;
        let desc = metadata.desc || "No Description";
        let groupMembersCount = metadata.participants.length;

        for (let num of participants) {
            let dpuser;
            let userName = num.split("@")[0]; // Extracting sender's name

            try {
                dpuser = await client.profilePictureUrl(num, "image");
            } catch {
                dpuser = "https://i.imgur.com/iEWHnOH.jpeg";
            }

            // Capture timestamps
            const timeJoined = new Date().toLocaleString();
            const timeLeft = new Date().toLocaleString();

            if (keizzah.action === "add") {
                const WelcomeText = `Hey @${userName} 👋
Welcome to *${metadata.subject}*.
You are member number ${groupMembersCount} in this group. 🙏
Time joined: *${timeJoined}*
Please read the group description to avoid being removed:
${desc}
*Powered by ${botname}.`;

                if (events === 'true') {
                    await client.sendMessage(keizzah.id, {
                        image: { url: dpuser },
                        caption: WelcomeText,
                        mentions: [num],
                        contextInfo: getContextInfo({ sender: Myself }),
                    });
                }
            } else if (keizzah.action === "remove") {
                const GoodbyeText = `Goodbye @${userName}. 😔
Another member has left the group.
Time left: *${timeLeft}*
The group now has ${groupMembersCount} members. 😭`;

                if (events === 'true') {
                    await client.sendMessage(keizzah.id, {
                        image: { url: dpuser },
                        caption: GoodbyeText,
                        mentions: [num],
                        contextInfo: getContextInfo({ sender: Myself }),
                    });
                }
            } else if (keizzah.action === "demote" && events === 'true') {
                await client.sendMessage(keizzah.id, {
                    text: `@${keizzah.author.split("@")[0]} has demoted @${keizzah.participants[0].split("@")[0]} from admin. 👀`,
                    mentions: [keizzah.author, keizzah.participants[0]],
                    contextInfo: getContextInfo({ sender: Myself }),
                });
            } else if (keizzah.action === "promote" && events === 'true') {
                await client.sendMessage(keizzah.id, {
                    text: `@${keizzah.author.split("@")[0]} has promoted @${keizzah.participants[0].split("@")[0]} to admin. 👀`,
                    mentions: [keizzah.author, keizzah.participants[0]],
                    contextInfo: getContextInfo({ sender: Myself }),
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = Events;
