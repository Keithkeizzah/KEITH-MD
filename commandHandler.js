const fs = require('fs');
const path = require('path');

const cmdsDir = path.join(__dirname, 'Cmds');

function findAllCommandFiles(dir) {
    let commandFiles = [];
    let totalCommands = 0; 

    function findFiles(directory) {
        const files = fs.readdirSync(directory);

        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                findFiles(filePath);
            } else if (file.endsWith('.js')) {
                commandFiles.push(filePath);
                totalCommands++;
            }
        }
    }

    findFiles(dir);
    return { commandFiles, totalCommands };
}

const { commandFiles, totalCommands } = findAllCommandFiles(cmdsDir);

const commands = {};
commandFiles.forEach(file => {
    
    const commandName = path.basename(file, '.js');
    const commandModule = require(file);
    commands[commandName] = commandModule;
});

module.exports = { commands, totalCommands };
