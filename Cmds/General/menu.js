const { DateTime } = require('luxon');
const fs = require('fs');

module.exports = async (context) => {
    const { client, m, totalCommands, mode, botname, prefix, url, sendReply, sendMediaMessage, author } = context;

    try {
        const categories = [
            { name: 'AI', emoji: '」' },
            { name: 'General', emoji: '」' },
            { name: 'Media', emoji: '」' },
            { name: 'Search', emoji: '」' },
            { name: 'Editting', emoji: '」' },
            { name: 'Groups', emoji: '」' },
            { name: 'Fun', emoji: '」' },
            { name: 'Owner', emoji: '」' },
            { name: 'Coding', emoji: '」' },
            { name: 'Stalk', emoji: '」' }
        ];

        const quotes = [
            "Dream big, work hard.",
            "Dream big, work hard.",
            "Stay humble, hustle hard.",
            "Believe in yourself.",
            "Success is earned, not given.",
            "Actions speak louder than words.",
            "The best is yet to come.",
            "Keep pushing forward.",
            "Do more than just exist.",
            "Progress, not perfection.",
            "Stay positive, work hard.",
            "Be the change you seek.",
            "Never stop learning.",
            "Chase your dreams.",
            "Be your own hero.",
            "Life is what you make of it.",
            "Do it with passion or not at all.",
            "You are stronger than you think.",
            "Create your own path.",
            "Make today count.",
            "Embrace the journey.",
            "The best way out is always through.",
            "Strive for progress, not perfection.",
            "Don't wish for it, work for it.",
            "Live, laugh, love.",
            "Keep going, you're getting there.",
            "Don’t stop until you’re proud.",
            "Success is a journey, not a destination.",
            "Take the risk or lose the chance.",
            "It’s never too late.",
            "Believe you can and you're halfway there.",
            "Small steps lead to big changes.",
            "Happiness depends on ourselves.",
            "Take chances, make mistakes.",
            "Be a voice, not an echo.",
            "The sky is the limit.",
            "You miss 100% of the shots you don’t take.",
            "Start where you are, use what you have.",
            "The future belongs to those who believe.",
            "Don’t count the days, make the days count.",
            "Success is not the key to happiness. Happiness is the key to success."
            // ... (keep your existing quotes array)
        ];

        const getGreeting = () => {
            const currentHour = DateTime.now().setZone('Africa/Nairobi').hour;
            if (currentHour >= 5 && currentHour < 12) return 'Hello, Good morning 🌅';
            if (currentHour >= 12 && currentHour < 18) return 'Good afternoon ☀️';
            if (currentHour >= 18 && currentHour < 22) return 'Good evening 🌆';
            return 'Good night and have wonderful dreams 😴';
        };

        const getCurrentTimeInNairobi = () => {
            return DateTime.now().setZone('Africa/Nairobi').toLocaleString(DateTime.TIME_SIMPLE);
        };

        const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

        let menuText = `*╰►Hey, ${getGreeting()}, ${m.pushName}*\n\n`;
        menuText += `✨ *Inspiration*: *${getRandomQuote()}*  ✨\n\n`;
        menuText += `╭━━━  ⟮  ${botname} ⟯━━━━━━┈⊷\n`;
        menuText += `┃✵╭──────────────\n`;
        menuText += `┃✵│ ᴄᴏᴍᴍᴀɴᴅᴇʀ: ${m.pushName}\n`;
        menuText += `┃✵│ ᴛᴏᴛᴀʟ ᴘʟᴜɢɪɴs: ${totalCommands}\n`;
        menuText += `┃✵│ ᴛɪᴍᴇ: ${getCurrentTimeInNairobi()}\n`;
        menuText += `┃✵│ ᴘʀᴇғɪx: ${prefix}\n`;
        menuText += `┃✵│ ᴍᴏᴅᴇ: ${mode}\n`;
        menuText += '┃✵│ ʟɪʙʀᴀʀʏ: Baileys\n';
        menuText += '┃✵╰──────────────\n';
        menuText += '╰━━━━━━━━━━━━━━━━━━┈⊷\n';
        menuText += '━━━━━━━━━━━━━━━━━━━━\n';
        menuText += '*┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃:*\n\n';

        const toFancyUppercaseFont = (text) => {
            const fonts = {
                'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
                'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
            };
            return text.split('').map(char => fonts[char] || char).join('');
        };

        const toFancyLowercaseFont = (text) => {
            const fonts = {
                "a": "ᴀ", "b": "ʙ", "c": "ᴄ", "d": "ᴅ", "e": "ᴇ", "f": "ꜰ", "g": "ɢ", "h": "ʜ", "i": "ɪ", "j": "ᴊ", "k": "ᴋ", "l": "ʟ", "m": "ᴍ", 
                "n": "ɴ", "o": "ᴏ", "p": "ᴘ", "q": "ϙ", "r": "ʀ", "s": "ꜱ", "t": "ᴛ", "u": "ᴜ", "v": "ᴠ", "w": "ᴡ", "x": "x", "y": "ʏ", "z": "ᴢ"
            };
            return text.split('').map(char => fonts[char.toUpperCase()] || fonts[char] || char).join('');
        };

        let commandCounter = 1;

        for (const category of categories) {
            const commandFiles = fs.readdirSync(`./Cmds/${category.name}`).filter((file) => file.endsWith('.js'));
            const fancyCategory = toFancyUppercaseFont(category.name.toUpperCase());

            menuText += ` ╭─────「 ${fancyCategory} ${category.emoji}───┈⊷ \n`;
            for (const file of commandFiles) {
                const commandName = file.replace('.js', '');
                const fancyCommandName = toFancyLowercaseFont(commandName);
                menuText += ` ││◦➛  ${commandCounter}. ${fancyCommandName}\n`;
                commandCounter++;
            }
            menuText += ' ╰──────────────┈⊷ \n';
        }

        
        await sendMediaMessage(client, m, { 
            image: { url },
            caption: menuText,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            }
        });

    } catch (error) {
        console.error("Error:", error);
        sendReply(client, m, `Error: ${error.message}`);
    }
};
