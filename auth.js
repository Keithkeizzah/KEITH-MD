const fs = require('fs');
const { session } = require("./settings");

// Function to handle authentication and session management
async function authenticationn() {
  try {
    const credsPath = "./session/creds.json";

    // Check if session file exists
    if (!fs.existsSync(credsPath)) {
      console.log("Connecting...");
      await fs.writeFileSync(credsPath, atob(session), "utf8");
    } 
    // If session is not "zokk", update session file
    else if (session !== "zokk") {
      await fs.writeFileSync(credsPath, atob(session), "utf8");
    }
  } catch (error) {
    console.log("Session is invalid: " + error);
    return;
  }
}

module.exports = authenticationn;
