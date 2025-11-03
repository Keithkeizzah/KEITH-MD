const { database } = require('../settings');
const { DataTypes } = require('sequelize');

const GptConversationDB = database.define('gpt_conversations', {
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
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
});

async function initGptDB() {
    try {
        await GptConversationDB.sync({ alter: true });
        console.log('GPT Conversations table ready');
    } catch (error) {
        console.error('Error initializing GPT table:', error);
        throw error;
    }
}

// Save conversation to database
async function saveConversation(userJid, userMessage, aiResponse) {
    try {
        await GptConversationDB.create({
            user_jid: userJid,
            user_message: userMessage,
            ai_response: aiResponse
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
        const history = await GptConversationDB.findAll({
            where: { user_jid: userJid },
            order: [['timestamp', 'DESC']],
            limit: limit
        });
        return history.map(conv => ({
            user: conv.user_message,
            ai: conv.ai_response,
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
        const deleted = await GptConversationDB.destroy({
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
        const lastConv = await GptConversationDB.findOne({
            where: { user_jid: userJid },
            order: [['timestamp', 'DESC']]
        });
        return lastConv ? {
            user: lastConv.user_message,
            ai: lastConv.ai_response
        } : null;
    } catch (error) {
        console.error('Error getting last conversation:', error);
        return null;
    }
}

initGptDB().catch(err => {
    console.error('❌ Failed to initialize GPT database:', err);
});

module.exports = {
    saveConversation,
    getConversationHistory,
    clearConversationHistory,
    getLastConversation,
    initGptDB,
    GptConversationDB
};