
const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const AntiDeleteDB = database.define('antidelete', {
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    notification: {
        type: DataTypes.STRING,
        defaultValue: ' *Keith antiDelete*',
        allowNull: false
    },
    includeGroupInfo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    sendToOwner: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    includeMedia: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    timestamps: true
});

async function initAntiDeleteDB() {
    try {
        await AntiDeleteDB.sync({ alter: true });
        console.log('AntiDelete table ready');
    } catch (error) {
        console.error('Error initializing AntiDelete table:', error);
        throw error;
    }
}

async function getAntiDeleteSettings() {
    try {
        const settings = await AntiDeleteDB.findOne();
        if (!settings) {
            return await AntiDeleteDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting anti-delete settings:', error);
        return { 
            status: true, 
            notification: ' *Keith antiDelete*',
            includeGroupInfo: true,
            includeMedia: true
        };
    }
}

async function updateAntiDeleteSettings(updates) {
    try {
        const settings = await getAntiDeleteSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating anti-delete settings:', error);
        return null;
    }
}

module.exports = {
    initAntiDeleteDB,
    getAntiDeleteSettings,
    updateAntiDeleteSettings,
    AntiDeleteDB
};
