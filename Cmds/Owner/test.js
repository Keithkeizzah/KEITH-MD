module.exports = async (context) => {
  const { client, m } = context;

  // Sound file URLs
  const audioFiles = [
    'https://files.catbox.moe/fr8og5.mp3',
    'https://files.catbox.moe/xfggav.mp3',
    'https://files.catbox.moe/i55yzl.m4a',
    'https://files.catbox.moe/g62ba2.mp3',
    'https://files.catbox.moe/y47yfn.mp3',
    'https://files.catbox.moe/4vctb8.mp3',
    'https://files.catbox.moe/7evega.mp3',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ];

  // Randomly pick an audio file
  const vn = audioFiles[Math.floor(Math.random() * audioFiles.length)];

  // Other variables
  const name = m.pushName || client.getName(m.sender);
  const url = 'https://github.com/Keithkeizzah/KEITH-MD2';
  const murl = 'https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47';
  const img = 'https://files.catbox.moe/ax92lq.jpg';

  // Constructing the contact message
  const con = {
    key: {
      fromMe: false,
      participant: `${m.sender.split('@')[0]}@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: '254748387615@s.whatsapp.net' } : {}),
    },
    message: {
      contactMessage: {
        displayName: name,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  };

  // Audio file message with external ad reply info
  const doc = {
    audio: {
      url: vn,
    },
    mimetype: 'audio/mpeg',
    ptt: true,
    waveform: [100, 0, 100, 0, 100, 0, 100],
    fileName: 'shizo',
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: '𝗜 𝗔𝗠 𝗔𝗟𝗜𝗩𝗘 ꧁ঔ☬۝𝐅𝐎𝐔𝐑۝𝐅𝐈𝐍𝐆𝐄𝐑𝐒۝☬ঔ꧂',
        body: 'Regards Keithkeizzah',
        thumbnailUrl: img,
        sourceUrl: murl,
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  };

  // Send the message
  await client.sendMessage(m.chat, doc, { quoted: con });
};
