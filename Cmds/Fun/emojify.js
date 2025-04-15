module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    if (!text) {
      return m.reply("❌ Please provide some text to convert into emojis!");
    }

    // Map text to corresponding emoji characters
    const emojiMapping = {
      "a": "🅰️",
      "b": "🅱️",
      "c": "🇨️",
      "d": "🇩️",
      "e": "🇪️",
      "f": "🇫️",
      "g": "🇬️",
      "h": "🇭️",
      "i": "🇮️",
      "j": "🇯️",
      "k": "🇰️",
      "l": "🇱️",
      "m": "🇲️",
      "n": "🇳️",
      "o": "🅾️",
      "p": "🇵️",
      "q": "🇶️",
      "r": "🇷️",
      "s": "🇸️",
      "t": "🇹️",
      "u": "🇺️",
      "v": "🇻️",
      "w": "🇼️",
      "x": "🇽️",
      "y": "🇾️",
      "z": "🇿️",
      "0": "0️⃣",
      "1": "1️⃣",
      "2": "2️⃣",
      "3": "3️⃣",
      "4": "4️⃣",
      "5": "5️⃣",
      "6": "6️⃣",
      "7": "7️⃣",
      "8": "8️⃣",
      "9": "9️⃣",
      " ": "␣" // for space
    };

    // Convert the input text into emoji form
    const emojiText = text.toLowerCase().split("").map(char => emojiMapping[char] || char).join("");

    m.reply(`🔠 Emoji Text: *${emojiText}*`);
  } catch (e) {
    console.error("Error in .emoji command:", e);
    m.reply(`❌ Error: ${e.message}`);
  }
};
