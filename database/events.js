const config = require("../set");
const { DataTypes } = require('sequelize');

const EventsDB = config.DATABASE.define('events', {
    jid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    welcome: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'on'
    },
    goodbye: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'off'
    },
    antipromote: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'off'
    },
    antidemote: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'off'
    }
}, {
    timestamps: false
});

async function initEventsDB() {
    try {
        await EventsDB.sync({ alter: true });
        console.log('Events table ready');
    } catch (error) {
        console.error('Error initializing events table:', error);
        throw error;
    }
}

async function setEvent(jid, eventType, value) {
    try {
        const [event] = await EventsDB.findOrCreate({
            where: { jid },
            defaults: { [eventType]: value }
        });
        await event.update({ [eventType]: value });
        return true;
    } catch (error) {
        console.error(`Error setting ${eventType}:`, error);
        return false;
    }
}

async function getEvent(jid, eventType) {
    try {
        const event = await EventsDB.findOne({ where: { jid } });
        return event ? event[eventType] : 'off';
    } catch (error) {
        console.error(`Error getting ${eventType}:`, error);
        return 'off';
    }
}

module.exports = {
    initEventsDB,
    setEvent,
    getEvent,
    EventsDB
};
