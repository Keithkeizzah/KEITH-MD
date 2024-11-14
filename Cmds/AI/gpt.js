module.exports = async (context) => {
  const { client, message, text } = context;

  // Ensure there is some text provided, else prompt the user
  if (!text || text.trim() === '') {
    return message.reply("Please provide some text to chat with AI.");
  }

  // Extract the sender's ID
  const senderId = message.sender.split('@')[0];

  // Build the URL to interact with the AI service
  const apiUrl = `https://chatgptforprabath-md.vercel.app/api/gptv1?q=${encodeURIComponent(senderId)}`;

  try {
    // Fetch the response from the API
    const apiResponse = await fetch(apiUrl);

    // Check if the response is successful (status code 200)
    if (!apiResponse.ok) {
      throw new Error(`API error: ${apiResponse.statusText}`);
    }

    // Parse the JSON response
    const responseData = await apiResponse.json();

    // Check if the result is present in the response
    if (!responseData || !responseData.result) {
      throw new Error("AI response is empty or malformed.");
    }

    // Extract the result from the response
    const aiResponse = responseData.result;

    // Reply with the AI's response
    await message.reply(aiResponse);
  } catch (error) {
    // Handle any errors that occur during the fetch or processing
    console.error('Error:', error); // Log the error for debugging
    await message.reply(`An error occurred: ${error.message || 'Unknown error'}`);
  }
};
