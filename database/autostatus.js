const { DataTypes } = require('sequelize');
const { database } = require('../settings');

const AutoStatusDB = database.define('autostatus', {
  autoviewStatus: {
    type: DataTypes.STRING,
    defaultValue: 'true',
    allowNull: false,
    validate: { isIn: [['true', 'false']] }
  },
  autoLikeStatus: {
    type: DataTypes.STRING,
    defaultValue: 'false',
    allowNull: false,
    validate: { isIn: [['true', 'false']] }
  },
  autoReplyStatus: {
    type: DataTypes.STRING,
    defaultValue: 'false',
    allowNull: false,
    validate: { isIn: [['true', 'false']] }
  },
  statusReplyText: {
    type: DataTypes.TEXT,
    defaultValue: '✅ Status Viewed By Keith Md',
    allowNull: false
  },
  statusLikeEmojis: {
    type: DataTypes.TEXT,
    defaultValue: '💛,❤️,💜,🤍,💙',
    allowNull: false
  }
}, {
  timestamps: true
});

async function initAutoStatusDB() {
  try {
    await AutoStatusDB.sync({ alter: true });
    console.log('AutoStatus table ready');
  } catch (error) {
    console.error('Error initializing AutoStatus table:', error);
    throw error;
  }
}

async function getAutoStatusSettings() {
  try {
    const settings = await AutoStatusDB.findOne();
    if (!settings) return await AutoStatusDB.create({});
    return settings;
  } catch (error) {
    console.error('Error getting auto status settings:', error);
    return {
      autovewStatus: 'true',
      autoLikeStatus: 'false',
      autoReplyStatus: 'false',
      statusReplyText: '',
      statusLikeEmojis: ''
    };
  }
}

async function updateAutoStatusSettings(updates) {
  try {
    const settings = await getAutoStatusSettings();
    return await settings.update(updates);
  } catch (error) {
    console.error('Error updating auto status settings:', error);
    return null;
  }
}

module.exports = {
  initAutoStatusDB,
  getAutoStatusSettings,
  updateAutoStatusSettings,
  AutoStatusDB
};
