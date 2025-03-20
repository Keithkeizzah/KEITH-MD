module.exports = async (context) => {

const { client, m, text } = context;

const googleTTS = require('google-tts-api');

if (!text) return m.reply("Where is the text for conversion ?");

 

const url = googleTTS.getAudioUrl(text, {
  lang: 'hi-IN',
  slow: false,
  host: 'https://translate.google.com',
});

             client.sendMessage(m.chat, { audio: { url:url},mimetype:'audio/mp4', ptt: true }, { quoted: m });

}


                                        