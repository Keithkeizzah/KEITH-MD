const config = require("../set");
const { DataTypes } = require('sequelize');

const UsersRankDB = config.DATABASE.define('users_rank', {
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
            defaults: { xp: 10, messages: 1 }
        });
        
        if (!created) {
            await user.increment({
                xp: 10,
                messages: 1
            });
        }
        return true;
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
            attributes: ['messages', 'xp']
        });
        
        return user ? {
            messages: user.messages,
            xp: user.xp
        } : { messages: 0, xp: 0 };
    } catch (error) {
        console.error('Error getting user stats:', error);
        return { messages: 0, xp: 0 };
    }
}

// Get top 10 users by XP
async function getTop10Users() {
    try {
        return await UsersRankDB.findAll({
            order: [['xp', 'DESC']],
            limit: 10,
            attributes: ['jid', 'xp', 'messages']
        });
    } catch (error) {
        console.error('Error getting top users:', error);
        return [];
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
    initUsersRankDB,
    UsersRankDB
};
