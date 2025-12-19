const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const AutoBioDB = database.define('autobio', {
    status: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'off',
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        defaultValue: 'KEITH-MD Always active!',
        allowNull: false
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
        const [settings] = await AutoBioDB.findOrCreate({
            where: {},
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting AutoBio settings:', error);
        return { status: 'off', message: 'KEITH-MD Always active!' };
    }
}

async function updateAutoBioSettings(updates) {
    try {
        const settings = await getAutoBioSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating AutoBio settings:', error);
        return null;
    }
}

module.exports = {
    initAutoBioDB,
    getAutoBioSettings,
    updateAutoBioSettings,
    AutoBioDB
};
