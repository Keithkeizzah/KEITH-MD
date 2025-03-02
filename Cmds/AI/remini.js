const { enhanceImage } = require(__dirname + "/../../lib/remini");

module.exports = async (context) => {
  const { client, m, text: instructionText, mime: mimeType } = context;

  try {
    // Check if there is a quoted image
    if (!m.quoted) {
      return await client.sendMessage(m.chat, { text: "Send the image and tag it with the instruction." }, { quoted: m });
    }

    // Ensure there is an instruction text provided
    if (!instructionText) {
      return await client.sendMessage(m.chat, { text: "Provide some instruction. This vision AI is powered by Gemini Pro Vision." }, { quoted: m });
    }

    // Check if the file is an image
    if (!/image/.test(mimeType)) {
      return await client.sendMessage(m.chat, { text: "That is not an image. Please quote an actual image." }, { quoted: m });
    }

    try {
      const media = await m.quoted.download();
      if (!media) {
        return await client.sendMessage(m.chat, { text: "❌ *Failed to download media. Try again.*" }, { quoted: m });
      }

      const enhancedImage = await remini(media, 'enhance');
      await client.sendMessage(m.chat, { image: enhancedImage, caption: "✅ *Image enhancement successful!*" }, { quoted: m });
    } catch (error) {
      console.error(error);
      await client.sendMessage(m.chat, { text: "❌ *An error occurred while enhancing the image.*" }, { quoted: m });
    }
  } catch (error) {
    console.error(error);
    await client.sendMessage(m.chat, { text: "❌ *An error occurred.*" }, { quoted: m });
  }
};
