const { DateTime } = require('luxon');
const fs = require('fs').promises;

module.exports = async (context) => {
    const { 
        client, m, totalCommands, mode, botname, 
        prefix, url, sendReply, sendMediaMessage, author 
    } = context;

    try {
        // Configuration
        const CATEGORIES = [
            { name: 'AI', emoji: '🤖' },
            { name: 'General', emoji: '⚙️' },
            { name: 'Media', emoji: '🎵' },
            { name: 'Search', emoji: '🔍' },
            { name: 'Editing', emoji: '✏️' },
            { name: 'Groups', emoji: '👥' },
            { name: 'Fun', emoji: '🎮' },
            { name: 'Owner', emoji: '👑' },
            { name: 'Coding', emoji: '💻' },
            { name: 'Stalk', emoji: '👀' }
        ];

        // Helper functions
        const getGreeting = () => {
            const currentHour = DateTime.now().setZone('Africa/Nairobi').hour;
            return currentHour >= 5 && currentHour < 12 ? '🌅 Good Morning' :
                   currentHour >= 12 && currentHour < 18 ? '☀️ Good Afternoon' :
                   currentHour >= 18 && currentHour < 22 ? '🌆 Good Evening' : 
                   '🌙 Good Night';
        };

        const getCurrentTime = () => 
            DateTime.now().setZone('Africa/Nairobi').toLocaleString(DateTime.TIME_SIMPLE);

        const generateMenuHeader = () => {
            return `╭─── ✦ ${botname} ✦ ────⊷\n` +
                   `│ ➤ User: ${m.pushName || 'Guest'}\n` +
                   `│ ➤ Commands: ${totalCommands}\n` +
                   `│ ➤ Time: ${getCurrentTime()}\n` +
                   `│ ➤ Prefix: [ ${prefix} ]\n` +
                   `│ ➤ Mode: ${mode}\n` +
                   `╰────────────────────⊷\n\n`;
        };

        // Font transformation utilities
        const FONTS = {
            boldUpper: {
                'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 
                'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 
                'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 
                'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 
                'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
            },
            smallCaps: {
                'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ',
                'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ',
                'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ',
                'p': 'ᴘ', 'q': 'ϙ', 'r': 'ʀ', 's': 'ꜱ', 't': 'ᴛ',
                'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ'
            }
        };

        const transformText = (text, fontMap) => 
            text.split('').map(c => fontMap[c]?.[c] || c).join('');

        // Generate menu content
        let menuContent = `╭─── ✦ ${getGreeting()} ${m.pushName || ''} ✦ ───⊷\n\n`;

        // Add header section
        menuContent += generateMenuHeader();

        // Generate commands list
        let commandCount = 1;
        for (const category of CATEGORIES) {
            try {
                const commandFiles = await fs.readdir(`./Cmds/${category.name}`);
                const commands = commandFiles.filter(file => file.endsWith('.js'));
                
                if (commands.length === 0) continue;

                menuContent += `╭── ${category.emoji} ${transformText(category.name, FONTS.boldUpper)} ──⊷\n`;
                
                commands.forEach((file, index) => {
                    const commandName = file.replace('.js', '');
                    menuContent += `│ ${index + 1}. ${transformText(commandName, FONTS.smallCaps)}\n`;
                });

                menuContent += `╰────────────────────⊷\n`;
                commandCount += commands.length;
            } catch (error) {
                console.error(`Error loading ${category.name} commands:`, error);
            }
        }

        // Add footer
        menuContent += `\n╰─── ✦ Powered by ${author} ✦ ───⊷`;

        // Send media message with caption
        await sendMediaMessage(client, m, {
            image: { url },
            caption: menuContent,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            }
        });

    } catch (error) {
        console.error('Menu Generation Error:', error);
        await sendReply(client, m, `❌ Failed to generate menu: ${error.message}`);
    }
};
