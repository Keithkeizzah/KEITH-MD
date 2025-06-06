/*const config = require("../set");
const { DataTypes } = require('sequelize');

const NotesDB = config.DATABASE.define(
    'notes',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        timestamps: false,
    }
);

// Add this function to sync the model with database
async function syncNotesDB() {
    try {
        await NotesDB.sync({ alter: true }); // This will create the table if it doesn't exist
        console.log('Notes table synchronized successfully');
    } catch (error) {
        console.error('Error synchronizing notes table:', error);
        throw error;
    }
}

module.exports = {
    NotesDB,
    syncNotesDB,
    addNote: async (title, content) => {
        try {
            return await NotesDB.create({ title, content });
        } catch (error) {
            throw new Error(`Failed to add note: ${error.message}`);
        }
    },
    // ... keep all your other existing functions ...
};*/

const config = require("../set");
const { DataTypes } = require('sequelize');

const NotesDB = config.DATABASE.define('notes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
});

// Initialize table
async function initNotesDB() {
    try {
        await NotesDB.sync({ alter: true });
        console.log('Notes table ready');
    } catch (error) {
        console.error('Error initializing notes table:', error);
        throw error;
    }
}

// Database operations
async function addNote(title, content) {
    try {
        return await NotesDB.create({ title, content });
    } catch (error) {
        throw new Error(`Failed to add note: ${error.message}`);
    }
}

async function removeNote(id) {
    try {
        return await NotesDB.destroy({ where: { id } });
    } catch (error) {
        throw new Error(`Failed to remove note: ${error.message}`);
    }
}

async function getNotes() {
    try {
        return await NotesDB.findAll({ order: [['createdAt', 'DESC']] });
    } catch (error) {
        throw new Error(`Failed to get notes: ${error.message}`);
    }
}
async function getNote(id) {
    try {
        return await NotesDB.findByPk(id);
    } catch (error) {
        throw new Error(`Failed to get note: ${error.message}`);
    }
}

async function clearNotes() {
    try {
        // This will delete all records from the notes table
        return await NotesDB.destroy({ where: {}, truncate: true });
    } catch (error) {
        throw new Error(`Failed to clear notes: ${error.message}`);
    }
}

async function updateNote(id, updates) {
    try {
        const [updated] = await NotesDB.update(updates, { where: { id } });
        if (updated) return await NotesDB.findByPk(id);
        throw new Error('Note not found');
    } catch (error) {
        throw new Error(`Failed to update note: ${error.message}`);
    }
}

module.exports = {
    initNotesDB,
    NotesDB,
    addNote,
    removeNote,
    getNotes,
    getNote,
    clearNotes,
    updateNote
};
