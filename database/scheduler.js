const { database } = require("../settings");
const { DataTypes } = require('sequelize');

const SchedulerDB = database.define('schedule', {
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
        allowNull: true,
        validate: {
            isValidTime(value) {
                if (value && !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
                    throw new Error('Invalid time format (HH:MM)');
                }
            }
        }
    },
    unmuteTime: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isValidTime(value) {
                if (value && !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
                    throw new Error('Invalid time format (HH:MM)');
                }
            }
        }
    },
    timezone: {
        type: DataTypes.STRING,
        defaultValue: 'UTC',
        allowNull: false
    },
    isMuted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isScheduled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    lastUpdated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    daysActive: {
        type: DataTypes.STRING,
        defaultValue: '1111111', // 7 digits representing days (1=active, 0=inactive)
        validate: {
            isDaysFormat(value) {
                if (!/^[01]{7}$/.test(value)) {
                    throw new Error('Invalid days format (7 digits 0 or 1)');
                }
            }
        }
    }
}, {
    timestamps: false,
    indexes: [
        { fields: ['groupId'] },
        { fields: ['isMuted'] },
        { fields: ['isScheduled'] },
        { fields: ['muteTime'] },
        { fields: ['unmuteTime'] }
    ]
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

// Add or update schedule with enhanced validation
async function setSchedule(groupId, scheduleData) {
    try {
        const [schedule, created] = await SchedulerDB.findOrCreate({
            where: { groupId },
            defaults: { 
                groupId, 
                ...scheduleData,
                lastUpdated: new Date()
            }
        });
        
        if (!created) {
            await schedule.update({
                ...scheduleData,
                lastUpdated: new Date()
            });
        }
        
        return schedule;
    } catch (error) {
        console.error('Error setting schedule:', error);
        throw error;
    }
}

// Get schedule by groupId with additional info
async function getSchedule(groupId) {
    try {
        const schedule = await SchedulerDB.findOne({ where: { groupId } });
        return schedule;
    } catch (error) {
        console.error('Error getting schedule:', error);
        throw error;
    }
}

// Remove schedule with confirmation
async function removeSchedule(groupId) {
    try {
        const deleted = await SchedulerDB.destroy({ 
            where: { groupId },
            returning: true
        });
        return deleted > 0;
    } catch (error) {
        console.error('Error removing schedule:', error);
        throw error;
    }
}

// Get all scheduled groups with filtering options
async function getAllScheduledGroups(options = {}) {
    try {
        const where = { isScheduled: true };
        if (options.time) {
            where[options.mute ? 'muteTime' : 'unmuteTime'] = options.time;
        }
        return await SchedulerDB.findAll({
            where,
            order: [['lastUpdated', 'DESC']],
            raw: options.raw || false
        });
    } catch (error) {
        console.error('Error getting scheduled groups:', error);
        throw error;
    }
}

// Get all muted groups with additional options
async function getAllMutedGroups(options = {}) {
    try {
        return await SchedulerDB.findAll({
            where: { isMuted: true },
            order: [['lastUpdated', 'DESC']],
            raw: options.raw || false
        });
    } catch (error) {
        console.error('Error getting muted groups:', error);
        throw error;
    }
}

// Toggle mute status
async function toggleMuteStatus(groupId, isMuted) {
    try {
        const [updated] = await SchedulerDB.update(
            { isMuted, lastUpdated: new Date() },
            { where: { groupId } }
        );
        return updated > 0;
    } catch (error) {
        console.error('Error toggling mute status:', error);
        throw error;
    }
}

// Check if group should be muted/unmuted based on current time
async function checkScheduledGroups(currentTime) {
    try {
        return await SchedulerDB.findAll({
            where: {
                isScheduled: true,
                [database.Op.or]: [
                    { muteTime: currentTime },
                    { unmuteTime: currentTime }
                ]
            }
        });
    } catch (error) {
        console.error('Error checking scheduled groups:', error);
        throw error;
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
    getAllMutedGroups,
    toggleMuteStatus,
    checkScheduledGroups
};
