const config = require("../set");
const { DataTypes } = require('sequelize');

const GPTMemoryDB = config.DATABASE.define('gptmemory', {
    conversationId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    jid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    history: {
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: false
    },
    lastUpdated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    indexes: [
        { fields: ['jid'] },
        { fields: ['lastUpdated'] }
    ],
    timestamps: false
});

async function initGPTMemoryDB() {
    try {
        await GPTMemoryDB.sync({ alter: true });
        console.log('GPT Memory table ready');
    } catch (error) {
        console.error('Error initializing GPT memory:', error);
        throw error;
    }
}

async function saveConversation(jid, conversationId, messages) {
    try {
        await GPTMemoryDB.upsert({
            conversationId,
            jid,
            history: messages,
            lastUpdated: new Date()
        });
        return true;
    } catch (error) {
        console.error('Error saving conversation:', error);
        return false;
    }
}
// Add this to your existing gptmemory.js exports
async function getAllConversations(limit = 20) {
    try {
        return await GPTMemoryDB.findAll({
            order: [['lastUpdated', 'DESC']],
            limit,
            raw: true
        });
    } catch (error) {
        console.error('Error getting all conversations:', error);
        return [];
    }
}

async function getConversation(conversationId) {
    try {
        const conv = await GPTMemoryDB.findOne({ 
            where: { conversationId },
            raw: true
        });
        return conv?.history || [];
    } catch (error) {
        console.error('Error getting conversation:', error);
        return [];
    }
}

async function getUserConversations(jid, limit = 5) {
    try {
        return await GPTMemoryDB.findAll({
            where: { jid },
            order: [['lastUpdated', 'DESC']],
            limit,
            raw: true
        });
    } catch (error) {
        console.error('Error getting user conversations:', error);
        return [];
    }
}

async function clearConversation(conversationId) {
    try {
        const deleted = await GPTMemoryDB.destroy({ where: { conversationId } });
        return deleted > 0;
    } catch (error) {
        console.error('Error clearing conversation:', error);
        return false;
    }
}

module.exports = {
    initGPTMemoryDB,
    saveConversation,
    getConversation,
    getUserConversations,
    clearConversation,
    GPTMemoryDB
};
