
/* fixed module for keith command handler */

const fs = require('fs');
const path = require('path');


const commands = [];


function keith(info, func) {
    const defaults = {
        dontAddCommandList: false,
        desc: '',
        fromMe: false,
        category: 'misc',
        filename: 'Not Provided',
        react: null,
        alias: []
    };
    
    const command = {
        ...defaults,
        ...info,
        function: func
    };
    
    
    if (!command.pattern) {
        throw new Error(`Command in ${command.filename} is missing required 'pattern' property`);
    }
    
    commands.push(command);
    return command;
}


function getCommands() {
    return commands;
}


function findCommand(input) {
    return commands.find(cmd => 
        cmd.pattern === input || 
        (cmd.alias && cmd.alias.includes(input))
    );
}

module.exports = {
    keith,
    commands: getCommands(),
    findCommand,
    AddCommand: keith,
    Function: keith,
    Module: keith
};
