const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const AutoBioDB = database.define('autobio', {
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        defaultValue: 'Keith WhatsApp Bot is active',
        allowNull: false
    },
    interval: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        allowNull: false,
        validate: {
            min: 5
        }
    }
}, {
    timestamps: true
});

async function initAutoBioDB() {
    try {
        await AutoBioDB.sync({ alter: true });
        console.log('AutoBio table ready');
    } catch (error) {
        console.error('Error initializing AutoBio table:', error);
        throw error;
    }
}

async function getAutoBioSettings() {
    try {
        const settings = await AutoBioDB.findOne();
        if (!settings) {
            return await AutoBioDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting auto-bio settings:', error);
        return { status: false, message: 'Keith WhatsApp Bot is active', interval: 10 };
    }
}

async function updateAutoBioSettings(updates) {
    try {
        const settings = await getAutoBioSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating auto-bio settings:', error);
        return null;
    }
}

module.exports = {
    initAutoBioDB,
    getAutoBioSettings,
    updateAutoBioSettings,
    AutoBioDB
};