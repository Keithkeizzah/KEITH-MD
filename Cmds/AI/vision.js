module.exports = async (messageContext) => {
  const { client, m: message, text: instructionText, mime: mimeType, uploadtoimgur } = messageContext;
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const axios = require("axios");

  try {
    // Check if there is a quoted image
    if (!message.quoted) {
      return message.reply("Send the image and tag it with the instruction.");
    }

    // Ensure there is an instruction text provided
    if (!instructionText) {
      return message.reply("Provide some instruction. This vision AI is powered by Gemini Pro Vision.");
    }

    // Check if the file is an image
    if (!/image/.test(mimeType)) {
      return message.reply("That is not an image. Please quote an actual image.");
    }

    // Download the quoted image
    let downloadedImagePath = await client.downloadAndSaveMediaMessage(message.quoted);

    // Upload image to Imgur
    let uploadedImageURL = await uploadtoimgur(downloadedImagePath);

    // Inform the user that the analysis is in progress
    message.reply("A moment, Keith is analyzing the contents of the image...");

    // Initialize the Google Generative AI client
    const googleAIClient = new GoogleGenerativeAI("AIzaSyC3sNClbdraGrS2ubb5PTdnm_RbUANtdzc");

    // Helper function to fetch the image as base64
    async function getImageBase64(imageURL, mimeType) {
      const response = await axios.get(imageURL, { responseType: "arraybuffer" });
      const base64Image = Buffer.from(response.data).toString("base64");
      return {
        inlineData: {
          data: base64Image,
          mimeType: mimeType
        }
      };
    }

    // Prepare the request payload for the AI model
    const requestPayload = {
      model: "gemini-1.5-flash"
    };

    // Generate content with the provided image and instruction text
    const generativeModel = googleAIClient.getGenerativeModel(requestPayload);
    const imageBase64Data = await getImageBase64(uploadedImageURL, "image/jpeg");
    const response = await generativeModel.generateContent([instructionText, imageBase64Data]);

    // Extract and send the AI response text
    const responseText = await response.response.text();
    await message.reply(responseText);

  } catch (error) {
    // Handle errors
    message.reply("I am unable to analyze images at the moment.\n" + error);
  }
};
