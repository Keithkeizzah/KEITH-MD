const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const AutoStatusDB = database.define('autostatus', {
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    saveToInbox: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    notifyOwner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    timestamps: true
});

async function initAutoStatusDB() {
    try {
        await AutoStatusDB.sync({ alter: true });
        console.log('AutoStatus table ready');
    } catch (error) {
        console.error('Error initializing AutoStatus table:', error);
        throw error;
    }
}

async function getAutoStatusSettings() {
    try {
        const settings = await AutoStatusDB.findOne();
        return settings || await AutoStatusDB.create({});
    } catch (error) {
        console.error('Error getting auto-status settings:', error);
        return { 
            enabled: false,
            saveToInbox: true,
            notifyOwner: false
        };
    }
}

async function updateAutoStatusSettings(updates) {
    try {
        const settings = await getAutoStatusSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating auto-status settings:', error);
        return null;
    }
}

module.exports = {
    initAutoStatusDB,
    getAutoStatusSettings,
    updateAutoStatusSettings,
    AutoStatusDB
};
