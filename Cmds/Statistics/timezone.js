module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    const timezone = text;

    if (!timezone) {
      return m.reply("❌ Please provide a timezone code. Example: .timezone Africa/Nairobi");
    }

    // Get current date and time
    const now = new Date();
    
    // Get local time and date in the specified timezone
    const options = { 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit", 
      hour12: true, 
      timeZone: timezone 
    };

    const timeOptions = { 
      ...options, 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    };

    const localTime = now.toLocaleTimeString("en-US", options);
    const localDate = now.toLocaleDateString("en-US", timeOptions);

    // Send the local time and date as a reply
    m.reply(`🕒 Current Local Time: ${localTime}\n📅 Current Date: ${localDate}`);
  } catch (e) {
    console.error("Error in .timezone command:", e);
    m.reply("❌ An error occurred. Please try again later.");
  }
};
