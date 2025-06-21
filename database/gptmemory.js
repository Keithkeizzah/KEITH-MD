const { database } = require("../settings");
const { DataTypes } = require('sequelize');

const GPTMemoryDB = database.define('gptmemory', {
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
    },
    title: {  // Added title field for better conversation management
        type: DataTypes.STRING,
        defaultValue: "New Conversation"
    },
    isArchived: {  // Added archive status
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    indexes: [
        { fields: ['jid'] },
        { fields: ['lastUpdated'] },
        { fields: ['isArchived'] }
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

async function saveConversation(jid, conversationId, messages, title = null) {
    try {
        const updateData = {
            jid,
            history: messages,
            lastUpdated: new Date()
        };
        
        if (title) {
            updateData.title = title;
        } else if (messages.length > 0) {
            // Auto-generate title from first message if not provided
            const firstMessage = messages[0].content.substring(0, 30);
            updateData.title = firstMessage + (messages[0].content.length > 30 ? '...' : '');
        }

        await GPTMemoryDB.upsert({
            conversationId,
            ...updateData
        });
        return true;
    } catch (error) {
        console.error('Error saving conversation:', error);
        return false;
    }
}

async function getConversation(conversationId) {
    try {
        const conv = await GPTMemoryDB.findOne({ 
            where: { conversationId },
            raw: true
        });
        return conv || null;
    } catch (error) {
        console.error('Error getting conversation:', error);
        return null;
    }
}

async function getUserConversations(jid, limit = 5, includeArchived = false) {
    try {
        const where = { jid };
        if (!includeArchived) {
            where.isArchived = false;
        }

        return await GPTMemoryDB.findAll({
            where,
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

async function updateConversationTitle(conversationId, title) {
    try {
        const [updated] = await GPTMemoryDB.update(
            { title },
            { where: { conversationId } }
        );
        return updated > 0;
    } catch (error) {
        console.error('Error updating conversation title:', error);
        return false;
    }
}

async function archiveConversation(conversationId, archive = true) {
    try {
        const [updated] = await GPTMemoryDB.update(
            { isArchived: archive },
            { where: { conversationId } }
        );
        return updated > 0;
    } catch (error) {
        console.error('Error archiving conversation:', error);
        return false;
    }
}

async function cleanupOldConversations(maxAgeDays = 30, limit = 1000) {
    try {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - maxAgeDays);

        const deleted = await GPTMemoryDB.destroy({
            where: {
                lastUpdated: { [database.Op.lt]: cutoffDate },
                isArchived: true
            },
            limit
        });

        console.log(`Cleaned up ${deleted} old conversations`);
        return deleted;
    } catch (error) {
        console.error('Error cleaning up old conversations:', error);
        return 0;
    }
}

module.exports = {
    initGPTMemoryDB,
    saveConversation,
    getConversation,
    getUserConversations,
    clearConversation,
    updateConversationTitle,
    archiveConversation,
    cleanupOldConversations,
    GPTMemoryDB
};
