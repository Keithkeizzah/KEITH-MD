const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const AutoLikeStatusDB = database.define('autolikestatus', {
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    delay: {
        type: DataTypes.INTEGER,
        defaultValue: 3000,
        allowNull: false,
        validate: {
            min: 1000
        }
    },
    emojis: {
        type: DataTypes.JSON,
        defaultValue: ['😂', '😥', '😇', '🥹', '💥', '💯', '🔥', '💫', '👽', '💗', '❤️‍🔥', '👁️', '👀', '🙌', '🙆', '🌟', '💧', '🎇', '🎆', '♂️', '✅'],
        allowNull: false
    }
}, {
    timestamps: true
});

async function initAutoLikeStatusDB() {
    try {
        await AutoLikeStatusDB.sync({ alter: true });
        console.log('AutoLikeStatus table ready');
    } catch (error) {
        console.error('Error initializing AutoLikeStatus table:', error);
        throw error;
    }
}

async function getAutoLikeStatusSettings() {
    try {
        const settings = await AutoLikeStatusDB.findOne();
        if (!settings) {
            return await AutoLikeStatusDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting auto-like-status settings:', error);
        return { 
            status: false, 
            delay: 3000, 
            emojis: ['😂', '😥', '😇', '🥹', '💥', '💯', '🔥', '💫', '👽', '💗', '❤️‍🔥', '👁️', '👀', '🙌', '🙆', '🌟', '💧', '🎇', '🎆', '♂️', '✅']
        };
    }
}

async function updateAutoLikeStatusSettings(updates) {
    try {
        const settings = await getAutoLikeStatusSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating auto-like-status settings:', error);
        return null;
    }
}

module.exports = {
    initAutoLikeStatusDB,
    getAutoLikeStatusSettings,
    updateAutoLikeStatusSettings,
    AutoLikeStatusDB
};