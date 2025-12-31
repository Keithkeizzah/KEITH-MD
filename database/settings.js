
const { DataTypes } = require('sequelize');
const { database } = require('../settings'); 

const SettingsDB = database.define('settings', {
    prefix: {
        type: DataTypes.STRING,
        defaultValue: ".",
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        defaultValue: "Keith",
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        defaultValue: "https://files.catbox.moe/eqh7vz.png",
        allowNull: false
    },
    gurl: {
        type: DataTypes.STRING,
        defaultValue: "https://github.com/Keithkeizzah/KEITH-MD",
        allowNull: false
    },
    timezone: {
        type: DataTypes.STRING,
        defaultValue: "Africa/Nairobi",
        allowNull: false
    },
    botname: {
        type: DataTypes.STRING,
        defaultValue: "KEITH-MD",
        allowNull: false
    },
    packname: {
        type: DataTypes.STRING,
        defaultValue: "KEITH-MD",
        allowNull: false
    },
    mode: {
        type: DataTypes.STRING,
        defaultValue: "public",
        allowNull: false
    
    
    },
    sessionName: {
        type: DataTypes.STRING,
        defaultValue: "keith-md",
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'bot_settings'
});

async function initSettingsDB() {
    try {
        await SettingsDB.sync({ alter: true });
        console.log('Settings table ready');
    } catch (error) {
        console.error('Error initializing Settings table:', error);
        throw error;
    }
}

async function getSettings() {
    try {
        let settings = await SettingsDB.findOne();
        if (!settings) {
            settings = await SettingsDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting settings:', error);
        // Fallback to default settings
        return {
            prefix: ".",
            author: "Keith",
            url: "https://files.catbox.moe/eqh7vz.png",
            gurl: "https://github.com/Keithkeizzah/KEITH-MD",
            timezone: "Africa/Nairobi",
            botname: "KEITH-MD",
            packname: "KEITH-MD",
            mode: "public",
           
            sessionName: "KEITH-MD"
        };
    }
}

async function updateSettings(updates) {
    try {
        const settings = await getSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating settings:', error);
        return null;
    }
}

async function getSetting(key) {
    try {
        const settings = await getSettings();
        return settings[key];
    } catch (error) {
        console.error(`Error getting setting ${key}:`, error);
        return null;
    }
}

module.exports = {
    initSettingsDB,
    getSettings,
    updateSettings,
    getSetting,
    SettingsDB
};
