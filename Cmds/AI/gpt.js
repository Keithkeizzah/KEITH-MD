module.exports = async (context) => {
  const { client, message, text } = context;

  // Check if there is any text provided
  if (!text) {
    return message.reply("Please provide some text to chat with AI.");
  }

  // Extract the sender's ID
  const senderId = message.sender.split('@')[0];

  // Build the URL to interact with the AI service
  const apiUrl = `https://chatgptforprabath-md.vercel.app/api/gptv1?q=${senderId}`;

  try {
    // Fetch the response from the API
    const apiResponse = await fetch(apiUrl);

    // Check if the response is successful (status code 200)
    if (!apiResponse.ok) {
      throw new Error(`Error fetching data: ${apiResponse.statusText}`);
    }

    // Parse the JSON response
    const responseData = await apiResponse.json();

    // Check if the result is present in the response
    if (!responseData.result) {
      throw new Error("No result found in the response.");
    }

    // Extract the result from the response
    const aiResponse = responseData.result;

    // Reply with the AI's response
    await message.reply(aiResponse);
  } catch (error) {
    // Handle any errors that occur during the fetch or processing
    console.error('Error:', error);
    await message.reply("An error occurred: " + error.message);
  }
};
