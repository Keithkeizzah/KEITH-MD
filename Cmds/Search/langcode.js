module.exports = async (context) => {
  const { client, m } = context;


  const messageCaption = `
 
Here is a list of common language codes and their corresponding language names:

en - English  
es - Spanish  
fr - French  
de - German  
it - Italian  
pt - Portuguese  
ru - Russian  
zh - Chinese  
ja - Japanese  
ar - Arabic  
ko - Korean  
hi - Hindi  
bn - Bengali  
pl - Polish  
nl - Dutch  
tr - Turkish  
sv - Swedish  
no - Norwegian  
fi - Finnish  
da - Danish  
el - Greek  
cs - Czech  
ro - Romanian  
hu - Hungarian  
he - Hebrew  
th - Thai  
vi - Vietnamese  
id - Indonesian  
ms - Malay  
ta - Tamil  
te - Telugu  
uk - Ukrainian  
sr - Serbian  
hr - Croatian  
sk - Slovak  
lt - Lithuanian  
lv - Latvian  
et - Estonian  
sl - Slovenian  
mk - Macedonian  
bg - Bulgarian  
is - Icelandic  
mt - Maltese  
af - Afrikaans  
sw - Swahili  
ka - Georgian  
am - Amharic  
mr - Marathi  
pa - Punjabi  
ur - Urdu  
gu - Gujarati  
ne - Nepali  
si - Sinhala  
ky - Kyrgyz  
mn - Mongolian  
hy - Armenian  
sq - Albanian  
bs - Bosnian  
sw - Swahili  
tl - Tagalog  
la - Latin  
eo - Esperanto  
ga - Irish  
cy - Welsh  
qu - Quechua  
mi - Maori  
zu - Zulu  
xh - Xhosa  
jw - Javanese  
kn - Kannada  
ml - Malayalam  
or - Odia  
as - Assamese  
my - Burmese  
lo - Lao  
km - Khmer  
ps - Pashto  
fa - Persian  
yi - Yiddish  
sq - Albanian  
te - Telugu

*Regards keithkeizzah*
  `;

  // Prepare the image URL
  const image = {
    url: "https://files.catbox.moe/yldsxj.jpg"
  };

  // Prepare the message object
  const message = {
    image: image,
    caption: messageCaption
  };

  // Send the message
  await client.sendMessage(m.chat, message, { quoted: m });
};
