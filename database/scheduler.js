const config = require("../set");
const { DataTypes } = require('sequelize');

const SchedulerDB = config.DATABASE.define('schedule', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    groupId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    muteTime: {
        type: DataTypes.STRING,
        allowNull: true
    },
    unmuteTime: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isMuted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isScheduled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

// Initialize table
async function initSchedulerDB() {
    try {
        await SchedulerDB.sync({ alter: true });
        console.log('Schedule table ready');
    } catch (error) {
        console.error('Error initializing schedule table:', error);
        throw error;
    }
}

// Add or update schedule
async function setSchedule(groupId, scheduleData) {
    try {
        const [schedule, created] = await SchedulerDB.findOrCreate({
            where: { groupId },
            defaults: { groupId, ...scheduleData }
        });
        
        if (!created) {
            await schedule.update(scheduleData);
        }
        
        return true;
    } catch (error) {
        console.error('Error setting schedule:', error);
        return false;
    }
}

// Get schedule by groupId
async function getSchedule(groupId) {
    try {
        const schedule = await SchedulerDB.findOne({ where: { groupId } });
        return schedule ? schedule.toJSON() : null;
    } catch (error) {
        console.error('Error getting schedule:', error);
        return null;
    }
}

// Remove schedule
async function removeSchedule(groupId) {
    try {
        const deleted = await SchedulerDB.destroy({ where: { groupId } });
        return deleted > 0;
    } catch (error) {
        console.error('Error removing schedule:', error);
        return false;
    }
}

// Get all scheduled groups
async function getAllScheduledGroups() {
    try {
        const results = await SchedulerDB.findAll({
            where: { isScheduled: true },
            raw: true
        });
        return results;
    } catch (error) {
        console.error('Error getting scheduled groups:', error);
        return [];
    }
}

// Get all muted groups
async function getAllMutedGroups() {
    try {
        const results = await SchedulerDB.findAll({
            where: { isMuted: true },
            raw: true
        });
        return results;
    } catch (error) {
        console.error('Error getting muted groups:', error);
        return [];
    }
}

// Initialize the table
initSchedulerDB().catch(err => {
    console.error('Failed to initialize schedule database:', err);
});

module.exports = {
    SchedulerDB,
    initSchedulerDB,
    setSchedule,
    getSchedule,
    removeSchedule,
    getAllScheduledGroups,
    getAllMutedGroups
};
