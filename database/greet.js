const config = require("../set");
const { DataTypes } = require('sequelize');

const GreetDB = config.DATABASE.define('greet', {
    status: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'on',
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        defaultValue: 'Hello! Thanks for messaging me. I\'ll respond soon.',
        allowNull: false
    },
    replied_contacts: {
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: false
    }
}, {
    timestamps: false
});

async function initGreetDB() {
    try {
        await GreetDB.sync({ alter: true });
        console.log('Greet table ready');
    } catch (error) {
        console.error('Error initializing Greet table:', error);
        throw error;
    }
}

async function getGreetSettings() {
    try {
        const [settings] = await GreetDB.findOrCreate({
            where: {},
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting Greet settings:', error);
        return { status: 'on', message: 'Hello! Thanks for messaging me.', replied_contacts: [] };
    }
}

async function updateGreetSettings(updates) {
    try {
        const settings = await getGreetSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating Greet settings:', error);
        return null;
    }
}

async function addRepliedContact(jid) {
    try {
        const settings = await getGreetSettings();
        const repliedContacts = new Set(settings.replied_contacts);
        repliedContacts.add(jid);
        await settings.update({ replied_contacts: [...repliedContacts] });
    } catch (error) {
        console.error('Error adding replied contact:', error);
    }
}

async function clearRepliedContacts() {
    try {
        const settings = await getGreetSettings();
        await settings.update({ replied_contacts: [] });
    } catch (error) {
        console.error('Error clearing replied contacts:', error);
    }
}

module.exports = {
    initGreetDB,
    getGreetSettings,
    updateGreetSettings,
    addRepliedContact,
    clearRepliedContacts,
    GreetDB
};
