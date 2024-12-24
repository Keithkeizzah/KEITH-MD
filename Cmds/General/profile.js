module.exports = async (context) => {
    const { client, m } = context;

    let sender = null;
    let name = null;

    if (!m.quoted) {
        sender = m.sender;
        name = m.pushName;

        let ppUrl;
        try {
            ppUrl = await client.profilePictureUrl(sender, 'image');
        } catch {
            ppUrl = "https://telegra.ph/file/95680cd03e012bb08b9e6.jpg";
        }

        let status;
        try {
            status = await client.fetchStatus(sender);
        } catch (error) {
            status = { status: "About not accessible due to user privacy" };
        }

        const mess = {
            image: { url: ppUrl },
            caption: 'Name: ' + name + '\nAbout:\n' + status.status
        };

        await client.sendMessage(m.chat, mess, { quoted: m });

    } else {
        sender = m.quoted.sender;
        name = "@" + m.quoted.sender.split("@")[0];

        let ppUrl;
        try {
            ppUrl = await client.profilePictureUrl(sender, 'image');
        } catch {
            ppUrl = "https://telegra.ph/file/95680cd03e012bb08b9e6.jpg";
        }

        let status;
        try {
            status = await client.fetchStatus(sender);
        } catch (error) {
            status = { status: "About not accessible due to user privacy" };
        }

        const mess = {
            image: { url: ppUrl },
            caption: 'Name: ' + name + '\nAbout:\n' + status.status,
            mentions: [m.quoted.sender]
        };

        await client.sendMessage(m.chat, mess, { quoted: m });
    }
};