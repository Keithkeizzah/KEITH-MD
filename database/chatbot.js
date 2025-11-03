const { database } = require('../settings');
const { DataTypes } = require('sequelize');

// Define chatbot conversation table
const ChatbotConversationDB = database.define('chatbot_conversations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_jid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ai_response: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    response_type: {
        type: DataTypes.ENUM('text', 'audio', 'image', 'video', 'vision'),
        defaultValue: 'text',
        allowNull: false
    },
    media_url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
});

// Define chatbot settings table
const ChatbotSettingsDB = database.define('chatbot_settings', {
    status: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'off',
        allowNull: false
    },
    mode: {
        type: DataTypes.ENUM('private', 'group', 'both'),
        defaultValue: 'private',
        allowNull: false
    },
    trigger: {
        type: DataTypes.STRING,
        defaultValue: 'dm',
        allowNull: false
    },
    default_response: {
        type: DataTypes.ENUM('text', 'audio'),
        defaultValue: 'text',
        allowNull: false
    },
    voice: {
        type: DataTypes.STRING,
        defaultValue: 'Kimberly',
        allowNull: false
    }
}, {
    timestamps: true
});

// Available voices
const availableVoices = [
    'Kimberly', 'Salli', 'Joey', 'Justin', 'Matthew', 'Ivy', 'Joanna', 'Kendra',
    'Amy', 'Brian', 'Emma', 'Aditi', 'Raveena', 'Nicole', 'Russell'
];

// Initialize both tables
async function initChatbotDB() {
    try {
        await ChatbotConversationDB.sync({ alter: true });
        await ChatbotSettingsDB.sync({ alter: true });
        console.log('Chatbot tables ready');
    } catch (error) {
        console.error('Error initializing Chatbot tables:', error);
        throw error;
    }
}

// ===== CONVERSATION FUNCTIONS =====

// Save conversation to database
async function saveConversation(userJid, userMessage, aiResponse, responseType = 'text', mediaUrl = null) {
    try {
        await ChatbotConversationDB.create({
            user_jid: userJid,
            user_message: userMessage,
            ai_response: aiResponse,
            response_type: responseType,
            media_url: mediaUrl
        });
        return true;
    } catch (error) {
        console.error('Error saving conversation:', error);
        return false;
    }
}

// Get conversation history for a user
async function getConversationHistory(userJid, limit = 10) {
    try {
        const history = await ChatbotConversationDB.findAll({
            where: { user_jid: userJid },
            order: [['timestamp', 'DESC']],
            limit: limit
        });
        return history.map(conv => ({
            user: conv.user_message,
            ai: conv.ai_response,
            type: conv.response_type,
            media: conv.media_url,
            time: conv.timestamp
        }));
    } catch (error) {
        console.error('Error getting conversation history:', error);
        return [];
    }
}

// Clear conversation history for a user
async function clearConversationHistory(userJid) {
    try {
        const deleted = await ChatbotConversationDB.destroy({
            where: { user_jid: userJid }
        });
        return deleted > 0;
    } catch (error) {
        console.error('Error clearing conversation history:', error);
        return false;
    }
}

// Get last conversation for context
async function getLastConversation(userJid) {
    try {
        const lastConv = await ChatbotConversationDB.findOne({
            where: { user_jid: userJid },
            order: [['timestamp', 'DESC']]
        });
        return lastConv ? {
            user: lastConv.user_message,
            ai: lastConv.ai_response,
            type: lastConv.response_type,
            media: lastConv.media_url
        } : null;
    } catch (error) {
        console.error('Error getting last conversation:', error);
        return null;
    }
}

// ===== SETTINGS FUNCTIONS =====

async function getChatbotSettings() {
    try {
        const [settings] = await ChatbotSettingsDB.findOrCreate({
            where: {},
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting chatbot settings:', error);
        return { 
            status: 'off', 
            mode: 'private', 
            trigger: 'dm',
            default_response: 'text',
            voice: 'Kimberly'
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

// Initialize database
initChatbotDB().catch(err => {
    console.error('❌ Failed to initialize Chatbot database:', err);
});

module.exports = {
    // Conversation functions
    saveConversation,
    getConversationHistory,
    clearConversationHistory,
    getLastConversation,
    
    // Settings functions
    getChatbotSettings,
    updateChatbotSettings,
    
    // Voices
    availableVoices,
    
    // Initialization
    initChatbotDB,
    
    // Models (for advanced use)
    ChatbotConversationDB,
    ChatbotSettingsDB
};