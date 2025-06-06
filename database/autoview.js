const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const AutoViewDB = database.define('autoview', {
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    timestamps: true
});

async function initAutoViewDB() {
    try {
        await AutoViewDB.sync({ alter: true });
        console.log('AutoView table ready');
    } catch (error) {
        console.error('Error initializing AutoView table:', error);
        throw error;
    }
}

async function getAutoViewSettings() {
    try {
        const settings = await AutoViewDB.findOne();
        if (!settings) {
            return await AutoViewDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting auto-view settings:', error);
        return { status: false };
    }
}

async function updateAutoViewSettings(updates) {
    try {
        const settings = await getAutoViewSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating auto-view settings:', error);
        return null;
    }
}

module.exports = {
    initAutoViewDB,
    getAutoViewSettings,
    updateAutoViewSettings,
    AutoViewDB
};