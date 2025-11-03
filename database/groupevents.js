const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const GroupEventsDB = database.define('groupevents', {
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    welcomeMessage: {
        type: DataTypes.TEXT,
        defaultValue: "Hey @user 👋\nWelcome to *{group}*.\nYou're member #{count}.\nTime: *{time}*\nDescription: {desc}",
        allowNull: false
    },
    goodbyeMessage: {
        type: DataTypes.TEXT,
        defaultValue: "Goodbye @user 😔\nLeft at: *{time}*\nMembers left: {count}",
        allowNull: false
    },
    showPromotions: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    timestamps: true
});

async function initGroupEventsDB() {
    try {
        await GroupEventsDB.sync({ alter: true });
        console.log('GroupEvents table ready');
    } catch (error) {
        console.error('Error initializing GroupEvents table:', error);
        throw error;
    }
}

async function getGroupEventsSettings() {
    try {
        const settings = await GroupEventsDB.findOne();
        if (!settings) {
            return await GroupEventsDB.create({});
        }
        return settings;
    } catch (error) {
        console.error('Error getting group events settings:', error);
        return { 
            enabled: false,
            welcomeMessage: "Welcome @user to {group}!",
            goodbyeMessage: "Goodbye @user!",
            showPromotions: true
        };
    }
}

async function updateGroupEventsSettings(updates) {
    try {
        const settings = await getGroupEventsSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating group events settings:', error);
        return null;
    }
}

module.exports = {
    initGroupEventsDB,
    getGroupEventsSettings,
    updateGroupEventsSettings,
    GroupEventsDB
};