module.exports = async (context) => {

const { client, m, text } = context;
try {
if (!text) return m.reply('Provide a GitHub repo to stalk');

const fetch = require("node-fetch");

if (!text.includes('github.com')) {
        return m.reply(`Doesnt look like a GitHub repo link, uh?`);
    }


const link = text;

const parts = link.split("/");

const user = parts[3];

const repo = parts[4];

const response = await fetch(`https://itzpire.com/stalk/github_repo?username=${user}&repoName=${repo}`)

const data = await response.json()


const name = data.data.name;
const ownerLogin = data.data.owner.login;
const stars = data.data.stargazers_count;
const forks = data.data.forks_count;
const language = data.data.language;
const branch = data.data.default_branch;
const visibility = data.data.visibility;
const avatar = data.data.owner.avatar_url;


const summary = `
Name: ${name}
Owner: ${ownerLogin}
Stars: ${stars}
Forks: ${forks}
Language: ${language}
Branch: ${branch}
Visibility: ${visibility}
`;

await client.sendMessage(m.chat, { image: { url: avatar}, caption: summary}, { quoted: m})

} catch (error) {

m.reply("Command in error.")

}

}


