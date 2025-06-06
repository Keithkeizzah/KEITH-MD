const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const AntiLinkDB = database.define('antilink', {
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    action: {
        type: DataTypes.ENUM('delete', 'warn', 'remove'),
        defaultValue: 'warn',
        allowNull: false
    },
    exemptDomains: {
        type: DataTypes.JSON,
        defaultValue: ['whatsapp.com', 'youtube.com', 'instagram.com'],
        allowNull: false
    }
}, {
    timestamps: true
});

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
        const settings = await AntiLinkDB.findOne();
        if (!settings) {
            return await AntiLinkDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting anti-link settings:', error);
        return {
            status: false,
            action: 'warn',
            exemptDomains: ['whatsapp.com', 'youtube.com', 'instagram.com']
        };
    }
}

async function updateAntiLinkSettings(updates) {
    try {
        const settings = await getAntiLinkSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating anti-link settings:', error);
        return null;
    }
}

module.exports = {
    initAntiLinkDB,
    getAntiLinkSettings,
    updateAntiLinkSettings,
    AntiLinkDB
};
