const config = require("../set");
const { DataTypes } = require('sequelize');

const CronDB = config.DATABASE.define('cron', {
    group_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    mute_at: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    unmute_at: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: false,
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

// Database operations
async function getCron() {
    try {
        return await CronDB.findAll();
    } catch (error) {
        console.error('Error getting cron data:', error);
        return [];
    }
}

async function addCron(group_id, column, value) {
    try {
        const [record, created] = await CronDB.findOrCreate({
            where: { group_id },
            defaults: { [column]: value }
        });
        
        if (!created) {
            await record.update({ [column]: value });
        }
        return true;
    } catch (error) {
        console.error('Error adding/updating cron:', error);
        return false;
    }
}

async function getCronById(group_id) {
    try {
        return await CronDB.findByPk(group_id);
    } catch (error) {
        console.error('Error getting cron by ID:', error);
        return null;
    }
}

async function delCron(group_id) {
    try {
        const deleted = await CronDB.destroy({ where: { group_id } });
        return deleted > 0;
    } catch (error) {
        console.error('Error deleting cron:', error);
        return false;
    }
}

// Initialize the table
initCronDB().catch(err => {
    console.error('Failed to initialize cron database:', err);
});

module.exports = {
    getCron,
    addCron,
    delCron,
    getCronById,
    initCronDB,
    CronDB
};
