const fetch = require("node-fetch");

module.exports = async (messageContext) => {
  const { client, m: message, text: phoneNumber, sendReply, sendMediaMessage } = messageContext;

  try {
    if (!phoneNumber) {
      return sendReply(client, message, "Please provide a valid phone number.");
    }

    const encodedPhoneNumber = encodeURIComponent(phoneNumber);
    const response = await fetch(`https://keithmd-l4qc.onrender.com/code?number=${encodedPhoneNumber}`);

    if (!response.ok) {
      return sendReply(client, message, "Error fetching data from the API.Please try again later.");
    }

    const data = await response.json();
    if (!data || !data.code) {
      return sendReply(client, message, "Invalid phone number.");
    }

    const verificationCode = data.code;
    return sendReply(client, message, ` ${verificationCode}`);
  } catch (error) {
    console.log("Error occurred:", error);
    return sendReply(client, message, "An unexpected error occurred. Please try again later.");
  }
};
