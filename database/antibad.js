const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const AntiBadDB = database.define('antibad', {
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    groupAction: {
        type: DataTypes.ENUM('warn', 'remove'),
        defaultValue: 'warn',
        allowNull: false
    },
    warnLimit: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
        allowNull: false,
        validate: {
            min: 1,
            max: 10
        }
    },
    forbiddenWords: {
        type: DataTypes.JSON,
        defaultValue: [
            'kuma', 'mafi', 'kumbavu', 'ngombe', 'fala',
            'asshole', 'cunt', 'cock', 'slut', 'fag'
        ],
        allowNull: false
    }
}, {
    timestamps: true
});
async function initAntiBadDB() {
    try {
        await AntiBadDB.sync({ alter: true });
        console.log('AntiBad table ready');
    } catch (error) {
        console.error('Error initializing AntiBad table:', error);
        throw error;
    }
}

async function getAntiBadSettings() {
    try {
        const settings = await AntiBadDB.findOne();
        if (!settings) {
            return await AntiBadDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting anti-bad settings:', error);
        return {
            status: false,
            action: 'warn',
            forbiddenWords: [
                'kuma', 'mafi', 'kumbavu', 'ngombe', 'fala',
                'asshole', 'cunt', 'cock', 'slut', 'fag'
            ]
        };
    }
}

async function updateAntiBadSettings(updates) {
    try {
        const settings = await getAntiBadSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating anti-bad settings:', error);
        return null;
    }
}

module.exports = {
    initAntiBadDB,
    getAntiBadSettings,
    updateAntiBadSettings,
    AntiBadDB
};

// ... (keep the same init, get, and update functions as before)
                   
