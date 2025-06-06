const config = require("../set");
const { DataTypes } = require('sequelize');

const ChatbotDB = config.DATABASE.define('chatbot', {
    status: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'off',
        allowNull: false
    },
    inbox_status: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'off',
        allowNull: false
    }
}, {
    timestamps: false
});

async function initChatbotDB() {
    try {
        await ChatbotDB.sync({ alter: true });
        console.log('Chatbot table ready');
    } catch (error) {
        console.error('Error initializing Chatbot table:', error);
        throw error;
    }
}

async function getChatbotSettings() {
    try {
        const [settings] = await ChatbotDB.findOrCreate({
            where: {},
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting chatbot settings:', error);
        return { status: 'on', inbox_status: 'on' };
    }
}

async function updateChatbotSettings(updates) {
    try {
        const settings = await getChatbotSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating chatbot settings:', error);
        return null;
    }
}

module.exports = {
    initChatbotDB,
    getChatbotSettings,
    updateChatbotSettings,
    ChatbotDB
};
