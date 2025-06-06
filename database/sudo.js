const config = require("../set");
const { DataTypes } = require('sequelize');

const SudoDB = config.DATABASE.define('sudo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false,
});

// Initialize table
async function initSudoDB() {
    try {
        await SudoDB.sync({ alter: true });
        console.log('Sudo table ready');
    } catch (error) {
        console.error('Error initializing sudo table:', error);
        throw error;
    }
}

// Check if JID is sudo
async function isSudo(jid) {
    try {
        const count = await SudoDB.count({ where: { jid } });
        return count > 0;
    } catch (error) {
        console.error('Error checking sudo status:', error);
        return false;
    }
}

// Add sudo number
async function addSudoNumber(jid) {
    try {
        await SudoDB.findOrCreate({
            where: { jid },
            defaults: { jid }
        });
        console.log(`Added sudo number: ${jid}`);
        return true;
    } catch (error) {
        console.error('Error adding sudo number:', error);
        return false;
    }
}

// Remove sudo number
async function removeSudoNumber(jid) {
    try {
        const deleted = await SudoDB.destroy({ where: { jid } });
        if (deleted) {
            console.log(`Removed sudo number: ${jid}`);
        }
        return deleted > 0;
    } catch (error) {
        console.error('Error removing sudo number:', error);
        return false;
    }
}

// Get all sudo numbers
async function getAllSudoNumbers() {
    try {
        const results = await SudoDB.findAll({
            attributes: ['jid'],
            raw: true
        });
        return results.map(item => item.jid);
    } catch (error) {
        console.error('Error getting sudo numbers:', error);
        return [];
    }
}

// Check if sudo table has entries
async function isSudoTableNotEmpty() {
    try {
        const count = await SudoDB.count();
        return count > 0;
    } catch (error) {
        console.error('Error checking sudo table:', error);
        return false;
    }
}

// Initialize the table
initSudoDB().catch(err => {
    console.error('Failed to initialize sudo database:', err);
});

module.exports = {
    isSudo,
    addSudoNumber,
    removeSudoNumber,
    getAllSudoNumbers,
    isSudoTableNotEmpty,
    initSudoDB,
    SudoDB
};
