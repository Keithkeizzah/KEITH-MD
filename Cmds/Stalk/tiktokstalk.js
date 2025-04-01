module.exports = async (context) => {
    const { client, m, text } = context;
    
    try {
        if (!text) return m.reply('Please provide a TikTok username to stalk');
        
        const fetch = require("node-fetch");
        const username = text.trim(); // Remove any extra whitespace
        
        const response = await fetch(`https://apis-keith.vercel.app/stalker/tiktok?user=${username}`);
        const data = await response.json();
        
        if (!data.status) {
            return m.reply("Failed to fetch TikTok profile. Maybe the user doesn't exist?");
        }
        
        const profile = data.result.profile;
        const stats = data.result.stats;
        const settings = data.result.settings;
        
        // Format the profile information
        const summary = `
📌 *TikTok Profile Info* 📌

👤 *Username:* ${profile.username}
📛 *Nickname:* ${profile.nickname}
📝 *Bio:* ${profile.bio || 'No bio'}
✅ *Verified:* ${profile.verified ? 'Yes' : 'No'}
🔒 *Private Account:* ${profile.private ? 'Yes' : 'No'}
🌍 *Region:* ${profile.region}
📅 *Created At:* ${new Date(profile.createdAt).toLocaleDateString()}

📊 *Stats:*
👥 *Followers:* ${stats.followers.toLocaleString()}
🫂 *Following:* ${stats.following.toLocaleString()}
❤️ *Likes:* ${stats.likes.toLocaleString()}
🎥 *Videos:* ${stats.videos.toLocaleString()}
🤝 *Friends:* ${stats.friends.toLocaleString()}

⚙️ *Settings:*
💬 *Comments:* ${settings.comment === 0 ? 'Everyone' : 'Friends/Off'}
🎭 *Duets:* ${settings.duet === 0 ? 'Everyone' : 'Friends/Off'}
🧵 *Stitch:* ${settings.stitch === 0 ? 'Everyone' : 'Friends/Off'}
⬇️ *Download:* ${settings.download === 0 ? 'Allowed' : 'Disabled'}
`.trim();
        
        // Send profile picture with the summary as caption
        await client.sendMessage(
            m.chat, 
            { 
                image: { url: profile.avatars.large }, 
                caption: summary 
            }
        );
        
    } catch (error) {
        console.error('TikTok stalk error:', error);
        m.reply("An error occurred while fetching TikTok profile.");
    }
}
