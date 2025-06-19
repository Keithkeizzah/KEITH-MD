const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const ChatbotDB = database.define('chatbot', {
    textPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    textGroup: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    voicePrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    voiceGroup: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    messageDelay: {
        type: DataTypes.INTEGER,
        defaultValue: 1000,
        allowNull: false
    }
}, {
    timestamps: true
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
        const settings = await ChatbotDB.findOne();
        if (!settings) {
            return await ChatbotDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting chatbot settings:', error);
        return { 
            textPrivate: false,
            textGroup: false,
            voicePrivate: false,
            voiceGroup: false,
            messageDelay: 1000
        };
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
