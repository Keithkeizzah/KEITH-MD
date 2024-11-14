module.exports = async (context) => {
  try {
    const { client, m } = context;
    const from = m.from; // Get the sender's phone number
    const mek = m; // The message object for quoting
    
    // Retrieve the body of the message
    const body = m.body;
    const prefix = '!'; // You can change this to your desired prefix
    const cmd = body.startsWith(prefix) ? body.slice(prefix.length).trim() : null;
    
    // Extract the command from the message and execute if available
    const command = cmd ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : null;
    const commands = {
      'hack': async () => {
        // Define the steps of the prank
        const steps = [
          '💻 *SILENT-SOBX-MD HACK STARTING...* 💻',
          '',
          '*Initializing hacking tools...* 🛠️',
          '*Connecting to remote servers...* 🌐',
          '',
          '```[██████████] 10%``` ⏳',
          '```[████████████████████] 20%``` ⏳',
          '```[██████████████████████████████] 30%``` ⏳',
          '```[████████████████████████████████████████] 40%``` ⏳',
          '```[██████████████████████████████████████████████████] 50%``` ⏳',
          '```[████████████████████████████████████████████████████████████] 60%``` ⏳',
          '```[██████████████████████████████████████████████████████████████████████] 70%``` ⏳',
          '```[████████████████████████████████████████████████████████████████████████████████] 80%``` ⏳',
          '```[██████████████████████████████████████████████████████████████████████████████████████████] 90%``` ⏳',
          '```[████████████████████████████████████████████████████████████████████████████████████████████████████] 100%``` ✅',
          '',
          '🔒 *System Breach: Successful!* 🔓',
          '🚀 *Command Execution: Complete!* 🎯',
          '',
          '*📡 Transmitting data...* 📤',
          '*🕵️‍♂️ Ensuring stealth...* 🤫',
          '*🔧 Finalizing operations...* 🏁',
          '*🔧 Keith is Getting Your All Data...* 🎁',
          '',
          '⚠️ *Note:* All actions are for demonstration purposes only.',
          '⚠️ *Reminder:* Ethical hacking is the only way to ensure security.',
          '⚠️ *Reminder:* Strong hacking is the only way to ensure security.',
          '',
          ' *👨‍💻 YOUR DATA HACK SUCCESSFULLY 👩‍💻☣*'
        ];

        // Loop through all the steps and send them
        for (const line of steps) {
          await client.sendMessage(from, { text: line }, { quoted: mek });
          await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for effect
        }
      }
    };

    // Check if the command exists and execute
    if (commands[command]) {
      await commands[command]();
    } else {
      // Optionally handle if the command isn't recognized
      await client.sendMessage(from, { text: `❌ *Error!* Unrecognized command: ${command}.` }, { quoted: mek });
    }

  } catch (error) {
    console.error('Error during prank:', error);
    // Send a more detailed error message
    await client.sendMessage(from, {
      text: `❌ *Error!* Something went wrong. Reason: ${error.message}. Please try again later.`
    });
  }
};
