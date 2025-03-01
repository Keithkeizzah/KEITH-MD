module.exports = async (context) => {
    const { client, m, participants, text, sendReply, sendMediaMessage } = context;

    
    if (!m.isGroup) return sendReply(client, m, "Command meant for groups");

    const fs = require("fs");
    let gcdata = await client.groupMetadata(m.chat);

    let vcard = '';
    
    
    for (let a of gcdata.participants) {
        
        let username = a.notify || `⚔️🗡️${a.id.split("@")[0]}`;  
        
        
        vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:${username}\nTEL;type=CELL;type=VOICE;waid=${a.id.split("@")[0]}:+${a.id.split("@")[0]}\nEND:VCARD\n`;
    }

    let cont = './contacts.vcf';

    
    await sendReply(client, m, 'A moment, compiling ' + gcdata.participants.length + ' contacts into a VCF...');

    
    await fs.writeFileSync(cont, vcard.trim());

    
    await sendMediaMessage(client, m, {
        document: fs.readFileSync(cont),
        mimetype: 'text/vcard',
        fileName: 'Group contacts.vcf',
        caption: 'VCF for ' + gcdata.subject + '\n' + gcdata.participants.length + ' contacts'
    }, { ephemeralExpiration: 86400, quoted: m });

   
    fs.unlinkSync(cont);
};
