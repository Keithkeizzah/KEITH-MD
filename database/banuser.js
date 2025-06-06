const config = require("../set");
const { DataTypes } = require('sequelize');

const BanDB = config.DATABASE.define('ban', {
    jid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    reason: {
        type: DataTypes.TEXT,
        defaultValue: 'No reason provided'
    },
    bannedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

async function initBanDB() {
    try {
        await BanDB.sync({ alter: true });
        console.log('Ban table ready');
    } catch (error) {
        console.error('Error initializing ban table:', error);
        throw error;
    }
}

async function banUser(jid, reason = 'No reason provided') {
    try {
        const [user] = await BanDB.findOrCreate({
            where: { jid },
            defaults: { jid, reason }
        });
        return !!user;
    } catch (error) {
        console.error('Error banning user:', error);
        return false;
    }
}

async function unbanUser(jid) {
    try {
        const deleted = await BanDB.destroy({ where: { jid } });
        return deleted > 0;
    } catch (error) {
        console.error('Error unbanning user:', error);
        return false;
    }
}

async function isBanned(jid) {
    try {
        const ban = await BanDB.findOne({ where: { jid } });
        return ban ? {
            jid: ban.jid,
            reason: ban.reason,
            bannedAt: ban.bannedAt
        } : null;
    } catch (error) {
        console.error('Error checking ban status:', error);
        return null;
    }
}

async function getBannedUsers() {
    try {
        return await BanDB.findAll({
            attributes: ['jid', 'reason', 'bannedAt'],
            raw: true
        });
    } catch (error) {
        console.error('Error getting banned users:', error);
        return [];
    }
}

module.exports = {
    initBanDB,
    banUser,
    unbanUser,
    isBanned,
    getBannedUsers,
    BanDB
};
