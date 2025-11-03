
const { database } = require('../settings');
const { DataTypes } = require('sequelize');

const SudoDB = database.define('sudo', {
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

async function initSudoDB() {
    try {
        await SudoDB.sync({ alter: true });
        console.log('Sudo table ready');
    } catch (error) {
        console.error('Error initializing sudo table:', error);
        throw error;
    }
}


function getSudoNumbers() {
    return getAllSudoNumbers();
}

function setSudo(jid) {
    return addSudoNumber(jid);
}

function delSudo(jid) {
    return removeSudoNumber(jid);
}

// Database functions
async function isSudo(jid) {
    try {
        const count = await SudoDB.count({ where: { jid } });
        return count > 0;
    } catch (error) {
        console.error('Error checking sudo status:', error);
        return false;
    }
}

async function addSudoNumber(jid) {
    try {
        const [result, created] = await SudoDB.findOrCreate({
            where: { jid },
            defaults: { jid }
        });
        if (created) {
            console.log(`✅ Added sudo number: ${jid}`);
            return true;
        } else {
            console.log(`ℹ️ Sudo number already exists: ${jid}`);
            return false; // already exists
        }
    } catch (error) {
        console.error('❌ Error adding sudo number:', error);
        return false;
    }
}

async function removeSudoNumber(jid) {
    try {
        const deleted = await SudoDB.destroy({ where: { jid } });
        if (deleted) {
            console.log(`✅ Removed sudo number: ${jid}`);
            return true;
        } else {
            console.log(`ℹ️ Sudo number not found: ${jid}`);
            return false; // not found
        }
    } catch (error) {
        console.error('❌ Error removing sudo number:', error);
        return false;
    }
}

async function getAllSudoNumbers() {
    try {
        const results = await SudoDB.findAll({
            attributes: ['jid'],
            raw: true
        });
        return results.map(item => item.jid);
    } catch (error) {
        console.error('❌ Error getting sudo numbers:', error);
        return [];
    }
}

async function isSudoTableNotEmpty() {
    try {
        const count = await SudoDB.count();
        return count > 0;
    } catch (error) {
        console.error('❌ Error checking sudo table:', error);
        return false;
    }
}


initSudoDB().catch(err => {
    console.error('❌ Failed to initialize sudo database:', err);
});


module.exports = {
   
    getSudoNumbers,
    setSudo,
    delSudo,
    isSudo,
    addSudoNumber,
    removeSudoNumber,
    getAllSudoNumbers,
    isSudoTableNotEmpty,
    initSudoDB,
    SudoDB
};
