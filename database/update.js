const { database } = require("../settings");
const { DataTypes } = require('sequelize');

const UpdateDB = database.define('bot_updates', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    current_hash: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: 'initial',
        validate: {
            isHash(value) {
                if (!/^[a-f0-9]{40}$/i.test(value) && value !== 'initial') {
                    throw new Error('Invalid hash format (40-character SHA-1)');
                }
            }
        }
    },
    previous_hash: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    last_checked: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    last_updated: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'updated', 'failed', 'initial'),
        defaultValue: 'initial'
    },
    changelog: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    update_attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
    indexes: [
        { fields: ['status'] },
        { fields: ['last_checked'] }
    ]
});

async function initialize() {
    try {
        await UpdateDB.sync({ alter: true });
        const [record] = await UpdateDB.findOrCreate({
            where: { id: 1 },
            defaults: { status: 'initial' }
        });
        console.log('Update DB initialized');
        return record;
    } catch (error) {
        console.error('Update DB initialization error:', error);
        throw error;
    }
}

async function getUpdateRecord() {
    try {
        return await UpdateDB.findByPk(1);
    } catch (error) {
        console.error('Error getting update record:', error);
        return null;
    }
}

async function getCurrentHash() {
    const record = await getUpdateRecord();
    return record?.current_hash || 'initial';
}

async function setUpdateStatus(status, options = {}) {
    try {
        const updateData = { 
            status,
            last_checked: new Date() 
        };

        if (status === 'updated') {
            updateData.last_updated = new Date();
        }

        if (options.changelog) {
            updateData.changelog = options.changelog;
        }

        if (options.hash) {
            updateData.previous_hash = await getCurrentHash();
            updateData.current_hash = options.hash;
        }

        if (status === 'failed') {
            updateData.update_attempts = database.literal('update_attempts + 1');
        } else if (status === 'updated') {
            updateData.update_attempts = 0;
        }

        const [affected] = await UpdateDB.update(updateData, { 
            where: { id: 1 } 
        });
        return affected > 0;
    } catch (error) {
        console.error('Error setting update status:', error);
        return false;
    }
}

async function getUpdateHistory() {
    try {
        return await UpdateDB.findAll({
            order: [['last_checked', 'DESC']],
            limit: 10
        });
    } catch (error) {
        console.error('Error getting update history:', error);
        return [];
    }
}

module.exports = {
    UpdateDB,
    initialize,
    getCurrentHash,
    getUpdateRecord,
    setUpdateStatus,
    getUpdateHistory,
    // Legacy functions for backward compatibility
    getHash: getCurrentHash,
    setHash: async (hash) => setUpdateStatus('updated', { hash })
};
