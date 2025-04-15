const fs = require('fs');
const path = require('path');

// Define the directory where command files are located
const cmdsDir = path.join(__dirname, 'Cmds');

// Function to find all command files recursively in a directory
function findAllCommandFiles(directory) {
  let commandFiles = [];
  let totalCommands = 0;

  // Recursive function to search for .js files in the given directory
  function searchDirectory(currentDir) {
    // Read all files and directories inside the current directory
    const filesAndDirs = fs.readdirSync(currentDir);

    // Loop through each file or directory
    for (const fileOrDir of filesAndDirs) {
      const fullPath = path.join(currentDir, fileOrDir);
      const stat = fs.statSync(fullPath);

      // If it's a directory, recursively search it
      if (stat.isDirectory()) {
        searchDirectory(fullPath);
      } 
      // If it's a .js file, add it to the list of command files
      else if (fileOrDir.endsWith('.js')) {
        commandFiles.push(fullPath);
        totalCommands++;
      }
    }
  }

  // Start searching from the given directory
  searchDirectory(directory);

  // Return an object containing the list of command files and the total number of commands
  return {
    commandFiles,
    totalCommands
  };
}

// Get all command files and their count
const { commandFiles, totalCommands } = findAllCommandFiles(cmdsDir);

// Load the commands into an object, including their metadata (description, aliases, reaction)
const commands = {};
commandFiles.forEach(file => {
  const commandName = path.basename(file, '.js'); // Extract command name from the file name
  const commandModule = require(file); // Load the command module

  // Add metadata (aliases, description, reaction) to each command
  commands[commandName] = {
    execute: commandModule,
    description: commandModule.description || "No description provided.",
    aliases: commandModule.aliases || [],
    reaction: commandModule.reaction || null, // Reaction type (if any)
  };

  // Register aliases for the command
  if (commandModule.aliases && Array.isArray(commandModule.aliases)) {
    commandModule.aliases.forEach(alias => {
      commands[alias] = commands[commandName];
    });
  }
});

// Export the loaded commands and the total command count
module.exports = {
  commands,
  totalCommands
};
