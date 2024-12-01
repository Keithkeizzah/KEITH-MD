module.exports = async (context) => {
    const { client, m, participants, text } = context;

    // Check if the message is in a group
    if (!m.isGroup) return m.reply("Command meant for groups");

    const fs = require("fs");
    let gcdata = await client.groupMetadata(m.chat);
    let gcmem = participants.map(a => a.id);

    let vcard = '';
    
    // Iterate over each participant
    for (let a of gcdata.participants) {
        // Check if the participant is the group admin or owner
        let isAdminOrOwner = a.id === gcdata.owner || a.admin;
        
        // Use the participant's username (pushName) or fallback to a default name if no name exists
        let username = a.notify || m.pushName || `⚔️🗡️${isAdminOrOwner ? 'Admin' : 'Member'} ${a.id.split("@")[0]}`;
        
        // Create vCard format
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
