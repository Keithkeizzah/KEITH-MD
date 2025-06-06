const config = require("../set");
const { DataTypes } = require('sequelize');

const UpdateDB = config.DATABASE.define('bot_updates', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    current_hash: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: 'initial'
    },
    last_checked: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('pending', 'updated', 'failed'),
        defaultValue: 'updated'
    }
}, {
    timestamps: false,
    freezeTableName: true
});

async function initialize() {
    try {
        await UpdateDB.sync();
        const [record] = await UpdateDB.findOrCreate({
            where: { id: 1 },
            defaults: {}
        });
        return record;
    } catch (error) {
        console.error('Update DB init error:', error);
        throw error;
    }
}

module.exports = {
    UpdateDB,
    getHash: async () => {
        const record = await UpdateDB.findByPk(1);
        return record?.current_hash || 'initial';
    },
    setHash: async (hash) => {
        return await UpdateDB.update(
            { current_hash: hash, last_checked: new Date(), status: 'updated' },
            { where: { id: 1 } }
        );
    },
    initialize
};
