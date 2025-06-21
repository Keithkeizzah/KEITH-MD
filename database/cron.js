const { database } = require("../settings");
const { DataTypes } = require('sequelize');

const CronDB = database.define('cron', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    group_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mute_at: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isTimeFormat(value) {
                if (value && !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
                    throw new Error('Invalid time format (HH:MM)');
                }
            }
        }
    },
    unmute_at: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isTimeFormat(value) {
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
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    last_updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    indexes: [
        { fields: ['group_id'] },
        { fields: ['is_active'] },
        { fields: ['last_updated'] }
    ],
    timestamps: false
});

// Initialize table
async function initCronDB() {
    try {
        await CronDB.sync({ alter: true });
        console.log('Cron table ready');
    } catch (error) {
        console.error('Error initializing cron table:', error);
        throw error;
    }
}

// Get all cron jobs (with optional filtering)
async function getCronJobs(activeOnly = true) {
    try {
        const where = activeOnly ? { is_active: true } : {};
        return await CronDB.findAll({
            where,
            order: [['last_updated', 'DESC']]
        });
    } catch (error) {
        console.error('Error getting cron data:', error);
        return [];
    }
}

// Add or update a cron job
async function upsertCronJob(group_id, data) {
    try {
        const [record, created] = await CronDB.findOrCreate({
            where: { group_id },
            defaults: {
                ...data,
                last_updated: new Date()
            }
        });
        
        if (!created) {
            await record.update({
                ...data,
                last_updated: new Date()
            });
        }
        
        return record;
    } catch (error) {
        console.error('Error adding/updating cron job:', error);
        throw error;
    }
}

// Get cron job by group ID
async function getCronJobByGroupId(group_id) {
    try {
        return await CronDB.findOne({ 
            where: { group_id }
        });
    } catch (error) {
        console.error('Error getting cron job by group ID:', error);
        return null;
    }
}

// Delete cron job by group ID
async function deleteCronJob(group_id) {
    try {
        const deleted = await CronDB.destroy({ 
            where: { group_id } 
        });
        return deleted > 0;
    } catch (error) {
        console.error('Error deleting cron job:', error);
        return false;
    }
}

// Toggle cron job active status
async function toggleCronJob(group_id, is_active) {
    try {
        const [updated] = await CronDB.update(
            { is_active, last_updated: new Date() },
            { where: { group_id } }
        );
        return updated > 0;
    } catch (error) {
        console.error('Error toggling cron job:', error);
        return false;
    }
}

// Get all active cron jobs that need to run at the current time
async function getDueCronJobs(currentTime) {
    try {
        return await CronDB.findAll({
            where: {
                is_active: true,
                [database.Op.or]: [
                    { mute_at: currentTime },
                    { unmute_at: currentTime }
                ]
            }
        });
    } catch (error) {
        console.error('Error getting due cron jobs:', error);
        return [];
    }
}

// Initialize the table
initCronDB().catch(err => {
    console.error('Failed to initialize cron database:', err);
});

module.exports = {
    initCronDB,
    getCronJobs,
    upsertCronJob,
    getCronJobByGroupId,
    deleteCronJob,
    toggleCronJob,
    getDueCronJobs,
    CronDB
};
