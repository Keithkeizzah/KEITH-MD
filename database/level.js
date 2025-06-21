const { database } = require("../settings");
const { DataTypes } = require('sequelize');

const UsersRankDB = database.define('users_rank', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jid: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    xp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    messages: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    level: {  // Added level field
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
}, {
    timestamps: false,
});

// Initialize table
async function initUsersRankDB() {
    try {
        await UsersRankDB.sync({ alter: true });
        console.log('Users Rank table ready');
    } catch (error) {
        console.error('Error initializing users rank table:', error);
        throw error;
    }
}

// Add or update user data
async function addOrUpdateUserData(jid) {
    try {
        const [user, created] = await UsersRankDB.findOrCreate({
            where: { jid },
            defaults: { xp: 10, messages: 1, level: 1 }
        });
        
        if (!created) {
            const updatedUser = await user.increment({
                xp: 10,
                messages: 1
            });
            
            // Check if user should level up (100 XP per level)
            const xpNeeded = updatedUser.level * 100;
            if (updatedUser.xp >= xpNeeded) {
                await updatedUser.increment('level', { by: 1 });
            }
            
            return updatedUser;
        }
        return user;
    } catch (error) {
        console.error('Error updating user data:', error);
        return false;
    }
}

// Get user stats by JID
async function getMessagesAndXPByJID(jid) {
    try {
        const user = await UsersRankDB.findOne({ 
            where: { jid },
            attributes: ['messages', 'xp', 'level']
        });
        
        return user ? {
            messages: user.messages,
            xp: user.xp,
            level: user.level
        } : { messages: 0, xp: 0, level: 1 };
    } catch (error) {
        console.error('Error getting user stats:', error);
        return { messages: 0, xp: 0, level: 1 };
    }
}

// Get top 10 users by XP
async function getTop10Users() {
    try {
        return await UsersRankDB.findAll({
            order: [['xp', 'DESC']],
            limit: 10,
            attributes: ['jid', 'xp', 'messages', 'level']
        });
    } catch (error) {
        console.error('Error getting top users:', error);
        return [];
    }
}

// Get user level
async function getUserLevel(jid) {
    try {
        const user = await UsersRankDB.findOne({
            where: { jid },
            attributes: ['level']
        });
        return user ? user.level : 1;
    } catch (error) {
        console.error('Error getting user level:', error);
        return 1;
    }
}

// Initialize the table
initUsersRankDB().catch(err => {
    console.error('Failed to initialize users rank database:', err);
});

module.exports = {
    addOrUpdateUserData,
    getMessagesAndXPByJID,
    getTop10Users,
    getUserLevel,
    initUsersRankDB,
    UsersRankDB
};
