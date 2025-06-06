const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const PresenceDB = database.define('presence', {
    typing: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    recording: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    online: {
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

async function initPresenceDB() {
    try {
        await PresenceDB.sync({ alter: true });
        console.log('Presence table ready');
    } catch (error) {
        console.error('Error initializing Presence table:', error);
        throw error;
    }
}

async function getPresenceSettings() {
    try {
        const settings = await PresenceDB.findOne();
        if (!settings) {
            return await PresenceDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting presence settings:', error);
        return {
            typing: false,
            recording: false,
            online: false,
            chatTypes: ['private', 'group']
        };
    }
}

async function updatePresenceSettings(updates) {
    try {
        const settings = await getPresenceSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating presence settings:', error);
        return null;
    }
}

module.exports = {
    initPresenceDB,
    getPresenceSettings,
    updatePresenceSettings,
    PresenceDB
};
