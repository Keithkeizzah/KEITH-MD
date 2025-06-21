
const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const AutoDownloadStatusDB = database.define('autodownloadstatus', {
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    targetChat: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
    }
}, {
    timestamps: true
});

async function initAutoDownloadStatusDB() {
    try {
        await AutoDownloadStatusDB.sync({ alter: true });
        console.log('AutoDownloadStatus table ready');
    } catch (error) {
        console.error('Error initializing AutoDownloadStatus table:', error);
        throw error;
    }
}

async function getAutoDownloadStatusSettings() {
    try {
        const settings = await AutoDownloadStatusDB.findOne();
        if (!settings) {
            return await AutoDownloadStatusDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting auto-download-status settings:', error);
        return { status: false, targetChat: '' };
    }
}

async function updateAutoDownloadStatusSettings(updates) {
    try {
        const settings = await getAutoDownloadStatusSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating auto-download-status settings:', error);
        return null;
    }
}

module.exports = {
    initAutoDownloadStatusDB,
    getAutoDownloadStatusSettings,
    updateAutoDownloadStatusSettings,
    AutoDownloadStatusDB
};
