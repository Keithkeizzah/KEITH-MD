module.exports = async (context) => {
    const { client, m, participants, text } = context;

    // Check if the message is in a group
    if (!m.isGroup) return m.reply("Command meant for groups");

    const fs = require("fs");
    let gcdata = await client.groupMetadata(m.chat);

    let vcard = '';
    
    // Iterate over each participant in the group
    for (let a of gcdata.participants) {
        // Get the participant's actual WhatsApp name (display name)
        let username = a.notify || `⚔️🗡️${a.id.split("@")[0]}`;  // Use 'notify' (the display name) or fallback to their phone number
        
        // Create vCard format for the participant
        vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:${username}\nTEL;type=CELL;type=VOICE;waid=${a.id.split("@")[0]}:+${a.id.split("@")[0]}\nEND:VCARD\n`;
    }

    let cont = './contacts.vcf';

    // Notify user that the contact list is being compiled
    await m.reply('A moment, compiling ' + gcdata.participants.length + ' contacts into a VCF...');

    // Write the VCF data to a file
    await fs.writeFileSync(cont, vcard.trim());

    // Send the VCF file to the group
    await client.sendMessage(m.chat, {
        document: fs.readFileSync(cont),
        mimetype: 'text/vcard',
        fileName: 'Group contacts.vcf',
        caption: 'VCF for ' + gcdata.subject + '\n' + gcdata.participants.length + ' contacts'
    }, { ephemeralExpiration: 86400, quoted: m });

    // Clean up by deleting the temporary VCF file
    fs.unlinkSync(cont);
};
