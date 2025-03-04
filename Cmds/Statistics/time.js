module.exports = async (context) => {
  try {
    const { client, m, timezone } = context;

    // Get current date and time
    const now = new Date();
    
    // Get local time in the configured timezone
    const localTime = now.toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit", 
      hour12: true,
      timeZone: timezone, // Using the configured timezone from set.js
    });
    
    // Send the local time as reply
    m.reply(`🕒 Current Local Time: ${localTime}`);
  } catch (e) {
    console.error("Error in .timenow command:", e);
    m.reply("❌ An error occurred. Please try again later.");
  }
};
