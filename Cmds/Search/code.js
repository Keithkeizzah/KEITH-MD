const fetch = require("node-fetch");

module.exports = async (messageContext) => {
  const { client, m: message, text: phoneNumber } = messageContext;

  try {
    if (!phoneNumber) {
      return message.reply("Please provide a valid phone number.");
    }

    const encodedPhoneNumber = encodeURIComponent(phoneNumber);
    const response = await fetch(`https://keithmd.onrender.com/code?number=${encodedPhoneNumber}`);

    if (!response.ok) {
      return message.reply("Error fetching data from the API. Please try again later.");
    }

    const data = await response.json();
    if (!data || !data.code) {
      return message.reply("Invalid phone number.");
    }

    const verificationCode = data.code;
    return message.reply(` ${verificationCode}`);
  } catch (error) {
    console.log("Error occurred:", error);
    return message.reply("An unexpected error occurred. Please try again later.");
  }
};
