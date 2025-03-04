const axios = require('axios');
const traduction = require('traduction');

module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    if (!text) {
      return m.reply("❌ Please specify the surah number or name.");
    }

    const surahNumber = text.trim();

    const apiUrl = `https://quran-endpoint.vercel.app/quran/${surahNumber}`;
    const response = await axios.get(apiUrl);
    const data = response.data.data;

    // Translate the explanation to English using traduction
    const tafsirTranslated = await traduction(data.tafsir.id, { to: 'en' });

    const messageText = `
*🕌 Quran: The Holy Book*
📜 Surah ${data.number}: ${data.asma.ar.long} (${data.asma.en.long})
Type: ${data.type.en}
Number of verses: ${data.ayahCount}
🔮 *Explanation (Urdu):* ${data.tafsir.id}
🔮 *Explanation (Translated to English):* ${tafsirTranslated.text}
    `;

    m.reply(messageText.trim());
  } catch (e) {
    console.error("Error fetching Quran data or translating:", e);
    m.reply("❌ An error occurred. Please try again later.");
  }
};
