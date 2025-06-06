const config = require("../set");
const { DataTypes } = require('sequelize');

const AutoReactDB = config.DATABASE.define('autoreact', {
    status: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'off',
        allowNull: false
    },
    emojis: {
        type: DataTypes.JSON,
        defaultValue: ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '😊', '🎊', '🎉', '🎁', '🎈', '👋'],
        allowNull: false
    }
}, {
    timestamps: false
});

async function initAutoReactDB() {
    try {
        await AutoReactDB.sync({ alter: true });
        console.log('AutoReact table ready');
    } catch (error) {
        console.error('Error initializing AutoReact table:', error);
        throw error;
    }
}

async function getAutoReactSettings() {
    try {
        const [settings] = await AutoReactDB.findOrCreate({
            where: {},
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting AutoReact settings:', error);
        return { status: 'on', emojis: ['❤', '💕', '😻'] }; // Default fallback
    }
}

async function updateAutoReactSettings(updates) {
    try {
        const settings = await getAutoReactSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating AutoReact settings:', error);
        return null;
    }
}

module.exports = {
    initAutoReactDB,
    getAutoReactSettings,
    updateAutoReactSettings,
    AutoReactDB
};
