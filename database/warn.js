const config = require("../set");
const { DataTypes } = require('sequelize');

const WarnDB = config.DATABASE.define('warn', {
    jid: {
        type: DataTypes.STRING,
        primaryKey: true,
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
    lastWarned: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    indexes: [
        { fields: ['groupJid'] },
        { fields: ['lastWarned'] }
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

async function addWarning(jid, groupJid) {
    try {
        const [warn, created] = await WarnDB.findOrCreate({
            where: { jid, groupJid },
            defaults: { count: 1 }
        });
        
        if (!created) {
            warn.count += 1;
            warn.lastWarned = new Date();
            await warn.save();
        }
        
        return warn.count;
    } catch (error) {
        console.error('Error adding warning:', error);
        return 0;
    }
}

async function getWarnings(jid, groupJid) {
    try {
        const warn = await WarnDB.findOne({ 
            where: { jid, groupJid },
            raw: true
        });
        return warn?.count || 0;
    } catch (error) {
        console.error('Error getting warnings:', error);
        return 0;
    }
}

async function resetWarnings(jid, groupJid) {
    try {
        const deleted = await WarnDB.destroy({ 
            where: { jid, groupJid } 
        });
        return deleted > 0;
    } catch (error) {
        console.error('Error resetting warnings:', error);
        return false;
    }
}

module.exports = {
    initWarnDB,
    addWarning,
    getWarnings,
    resetWarnings,
    WarnDB
};
