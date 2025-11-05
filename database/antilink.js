const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const AntiLinkDB = database.define('antilink', {
    status: {
        type: DataTypes.ENUM('off', 'warn', 'delete', 'remove'),
        defaultValue: 'off',
        allowNull: false
    },
    action: {
        type: DataTypes.ENUM('warn', 'delete', 'remove'),
        defaultValue: 'warn',
        allowNull: false
    },
    warn_limit: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
        allowNull: false
    }
}, {
    timestamps: true
});

// Store warn counts in memory
const warnCounts = new Map();

async function initAntiLinkDB() {
    try {
        await AntiLinkDB.sync({ alter: true });
        console.log('AntiLink table ready');
    } catch (error) {
        console.error('Error initializing AntiLink table:', error);
        throw error;
    }
}

async function getAntiLinkSettings() {
    try {
        const [settings] = await AntiLinkDB.findOrCreate({
            where: {},
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting antilink settings:', error);
        return { 
            status: 'off', 
            action: 'warn', 
            warn_limit: 5
        };
    }
}

async function updateAntiLinkSettings(updates) {
    try {
        const settings = await getAntiLinkSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating antilink settings:', error);
        return null;
    }
}

function getWarnCount(userJid) {
    return warnCounts.get(userJid) || 0;
}

function incrementWarnCount(userJid) {
    const current = getWarnCount(userJid);
    warnCounts.set(userJid, current + 1);
    return current + 1;
}

function resetWarnCount(userJid) {
    warnCounts.delete(userJid);
}

function clearAllWarns() {
    warnCounts.clear();
}

module.exports = {
    initAntiLinkDB,
    getAntiLinkSettings,
    updateAntiLinkSettings,
    getWarnCount,
    incrementWarnCount,
    resetWarnCount,
    clearAllWarns,
    AntiLinkDB
};
