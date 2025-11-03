const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const GreetDB = database.define('greet', {
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        defaultValue: "Hello @user 👋\nWelcome to my chat!\nHow can I help you today?",
        allowNull: false
    }
}, {
    timestamps: true
});

// Store replied contacts in memory
const repliedContacts = new Set();

async function initGreetDB() {
    try {
        await GreetDB.sync({ alter: true });
        console.log('Greet table ready');
    } catch (error) {
        console.error('Error initializing Greet table:', error);
        throw error;
    }
}

async function getGreetSettings() {
    try {
        const settings = await GreetDB.findOne();
        if (!settings) {
            return await GreetDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting greet settings:', error);
        return { 
            enabled: false,
            message: "Hello @user 👋\nWelcome to my chat!"
        };
    }
}

async function updateGreetSettings(updates) {
    try {
        const settings = await getGreetSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating greet settings:', error);
        return null;
    }
}

function clearRepliedContacts() {
    repliedContacts.clear();
}

module.exports = {
    initGreetDB,
    getGreetSettings,
    updateGreetSettings,
    clearRepliedContacts,
    repliedContacts,
    GreetDB
};