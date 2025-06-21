const { database } = require("../settings");
const { DataTypes } = require('sequelize');

const WarnDB = database.define('warn', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    groupJid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    reasons: {
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: false
    },
    lastWarned: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    warnedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    indexes: [
        { fields: ['jid'] },
        { fields: ['groupJid'] },
        { fields: ['lastWarned'] },
        { fields: ['jid', 'groupJid'], unique: true }
    ],
    timestamps: false
});

async function initWarnDB() {
    try {
        await WarnDB.sync({ alter: true });
        console.log('Warn table ready');
    } catch (error) {
        console.error('Error initializing Warn table:', error);
        throw error;
    }
}

async function addWarning(jid, groupJid, reason = null, warnedBy = null) {
    try {
        const [warn, created] = await WarnDB.findOrCreate({
            where: { jid, groupJid },
            defaults: { 
                count: 1,
                reasons: reason ? [reason] : [],
                warnedBy
            }
        });
        
        if (!created) {
            warn.count += 1;
            warn.lastWarned = new Date();
            if (reason) {
                warn.reasons = [...warn.reasons, reason];
            }
            if (warnedBy) {
                warn.warnedBy = warnedBy;
            }
            await warn.save();
        }
        
        return {
            count: warn.count,
            reasons: warn.reasons,
            lastWarned: warn.lastWarned
        };
    } catch (error) {
        console.error('Error adding warning:', error);
        return null;
    }
}

async function getWarnings(jid, groupJid) {
    try {
        const warn = await WarnDB.findOne({ 
            where: { jid, groupJid }
        });
        return warn ? {
            count: warn.count,
            reasons: warn.reasons,
            lastWarned: warn.lastWarned,
            warnedBy: warn.warnedBy
        } : {
            count: 0,
            reasons: [],
            lastWarned: null,
            warnedBy: null
        };
    } catch (error) {
        console.error('Error getting warnings:', error);
        return {
            count: 0,
            reasons: [],
            lastWarned: null,
            warnedBy: null
        };
    }
}

async function resetWarnings(jid, groupJid) {
    try {
        const result = await WarnDB.destroy({ 
            where: { jid, groupJid } 
        });
        return result > 0;
    } catch (error) {
        console.error('Error resetting warnings:', error);
        return false;
    }
}

async function getGroupWarnings(groupJid, limit = 20) {
    try {
        return await WarnDB.findAll({
            where: { groupJid },
            order: [['count', 'DESC']],
            limit
        });
    } catch (error) {
        console.error('Error getting group warnings:', error);
        return [];
    }
}

async function reduceWarning(jid, groupJid, amount = 1) {
    try {
        const warn = await WarnDB.findOne({ 
            where: { jid, groupJid }
        });
        
        if (!warn) return false;
        
        warn.count = Math.max(0, warn.count - amount);
        await warn.save();
        
        return warn.count;
    } catch (error) {
        console.error('Error reducing warning:', error);
        return false;
    }
}

module.exports = {
    initWarnDB,
    addWarning,
    getWarnings,
    resetWarnings,
    getGroupWarnings,
    reduceWarning,
    WarnDB
};
