const { database } = require("../settings");
const { DataTypes } = require('sequelize');

const AntiForeignDB = database.define('antiforeign', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    groupJid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'group_country_combo'
    },
    countryCode: {
        type: DataTypes.STRING(5),
        allowNull: false,
        unique: 'group_country_combo'
    },
    action: {
        type: DataTypes.ENUM('kick', 'warn', 'notify'),
        defaultValue: 'kick',
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    whitelistNumbers: {
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: false
    },
    lastUpdated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    timestamps: false,
    indexes: [
        { fields: ['groupJid'] },
        { fields: ['countryCode'] },
        { fields: ['isActive'] }
    ]
});

// Initialize table
async function initAntiForeignDB() {
    try {
        await AntiForeignDB.sync({ alter: true });
        console.log('AntiForeign table ready');
    } catch (error) {
        console.error('Error initializing AntiForeign table:', error);
        throw error;
    }
}

/**
 * Add or update country rule for a group
 * @param {string} groupJid - Group's JID
 * @param {string} countryCode - Country code to block (e.g. '1', '44')
 * @param {string} action - Action to take ('kick', 'warn', 'notify')
 * @returns {Promise<boolean>} - True if successful
 */
async function setCountryRule(groupJid, countryCode, action = 'kick') {
    try {
        const [rule] = await AntiForeignDB.findOrCreate({
            where: { groupJid, countryCode },
            defaults: { action }
        });
        
        if (rule.action !== action) {
            rule.action = action;
            rule.lastUpdated = new Date();
            await rule.save();
        }
        
        return true;
    } catch (error) {
        console.error('Error setting country rule:', error);
        return false;
    }
}

/**
 * Remove country rule for a group
 * @param {string} groupJid - Group's JID
 * @param {string} countryCode - Country code to remove
 * @returns {Promise<number>} - Number of rules deleted
 */
async function removeCountryRule(groupJid, countryCode) {
    try {
        return await AntiForeignDB.destroy({
            where: { groupJid, countryCode }
        });
    } catch (error) {
        console.error('Error removing country rule:', error);
        return 0;
    }
}

/**
 * Get all blocked countries for a group
 * @param {string} groupJid - Group's JID
 * @returns {Promise<Array>} - Array of country rules
 */
async function getGroupRules(groupJid) {
    try {
        return await AntiForeignDB.findAll({
            where: { groupJid },
            order: [['countryCode', 'ASC']]
        });
    } catch (error) {
        console.error('Error getting group rules:', error);
        return [];
    }
}

/**
 * Check if a number should be kicked based on country code
 * @param {string} groupJid - Group's JID
 * @param {string} phoneNumber - User's phone number
 * @returns {Promise<{action: string|null, countryCode: string|null}>}
 */
async function checkForeignNumber(groupJid, phoneNumber) {
    try {
        // Extract country code from phone number
        const countryCode = extractCountryCode(phoneNumber);
        if (!countryCode) return { action: null, countryCode: null };

        const rule = await AntiForeignDB.findOne({
            where: {
                groupJid,
                countryCode,
                isActive: true
            }
        });

        if (!rule) return { action: null, countryCode };
        
        // Check if number is whitelisted
        if (rule.whitelistNumbers.includes(phoneNumber)) {
            return { action: null, countryCode };
        }

        return { action: rule.action, countryCode };
    } catch (error) {
        console.error('Error checking foreign number:', error);
        return { action: null, countryCode: null };
    }
}

/**
 * Toggle rule active status
 * @param {string} groupJid - Group's JID
 * @param {string} countryCode - Country code
 * @param {boolean} isActive - Whether to activate or deactivate
 * @returns {Promise<boolean>} - True if updated
 */
async function toggleRuleStatus(groupJid, countryCode, isActive) {
    try {
        const [updated] = await AntiForeignDB.update(
            { isActive, lastUpdated: new Date() },
            { where: { groupJid, countryCode } }
        );
        return updated > 0;
    } catch (error) {
        console.error('Error toggling rule status:', error);
        return false;
    }
}

/**
 * Add number to whitelist
 * @param {string} groupJid - Group's JID
 * @param {string} countryCode - Country code
 * @param {string} phoneNumber - Number to whitelist
 * @returns {Promise<boolean>} - True if added
 */
async function addToWhitelist(groupJid, countryCode, phoneNumber) {
    try {
        const rule = await AntiForeignDB.findOne({
            where: { groupJid, countryCode }
        });
        
        if (!rule) return false;
        
        if (!rule.whitelistNumbers.includes(phoneNumber)) {
            rule.whitelistNumbers = [...rule.whitelistNumbers, phoneNumber];
            rule.lastUpdated = new Date();
            await rule.save();
        }
        
        return true;
    } catch (error) {
        console.error('Error adding to whitelist:', error);
        return false;
    }
}

// Helper function to extract country code from phone number
function extractCountryCode(phoneNumber) {
    // Implement your country code extraction logic here
    // This is a simplified example
    if (phoneNumber.startsWith('+')) {
        return phoneNumber.substring(1, 3); // Get first 2 digits after +
    }
    return null;
}

// Initialize the table
initAntiForeignDB().catch(err => {
    console.error('Failed to initialize AntiForeign database:', err);
});

module.exports = {
    AntiForeignDB,
    initAntiForeignDB,
    setCountryRule,
    removeCountryRule,
    getGroupRules,
    checkForeignNumber,
    toggleRuleStatus,
    addToWhitelist
};
