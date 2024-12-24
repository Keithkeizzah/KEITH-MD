module.exports = async (context) => {

const { client, m, text } = context;

try {
if (!text) return m.reply("provide a gitHub username to fetch profile !")

const response = await fetch(`https://api.github.com/users/${text}`);
const data = await response.json();

const pic = `https://github.com/${data.login}.png`;


const userInfo = `
°GITHUB USER INFO°

♦️ Name: ${data.name}
🔖 Username: ${data.login}
✨ Bio: ${data.bio}
🏢 Company: ${data.company}
📍 Location: ${data.location}
📧 Email: ${data.email}
📰 Blog: ${data.blog}
🔓 Public Repo: ${data.public_repos}
👪 Followers: ${data.followers}
🫶 Following: ${data.following}
`;

await client.sendMessage(m.chat, { image: { url: pic }, caption: userInfo }, { quoted: m });



} catch (e) {

m.reply("I did not find that user, try again");

}

}