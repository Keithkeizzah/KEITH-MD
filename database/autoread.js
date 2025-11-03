const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const AutoReadDB = database.define('autoread', {
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    chatTypes: {
        type: DataTypes.JSON,
        defaultValue: ['private', 'group'],
        allowNull: false
    }
}, {
    timestamps: true
});

async function initAutoReadDB() {
    try {
        await AutoReadDB.sync({ alter: true });
        console.log('AutoRead table ready');
    } catch (error) {
        console.error('Error initializing AutoRead table:', error);
        throw error;
    }
}

async function getAutoReadSettings() {
    try {
        const settings = await AutoReadDB.findOne();
        if (!settings) {
            return await AutoReadDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting auto-read settings:', error);
        return { status: false, chatTypes: ['private', 'group'] };
    }
}

async function updateAutoReadSettings(updates) {
    try {
        const settings = await getAutoReadSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating auto-read settings:', error);
        return null;
    }
}

module.exports = {
    initAutoReadDB,
    getAutoReadSettings,
    updateAutoReadSettings,
    AutoReadDB
};