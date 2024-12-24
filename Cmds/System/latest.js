const simpleGit = require('simple-git');
const git = simpleGit();
const Heroku = require('heroku-client');
const exec = require('child_process').exec;

const herokuapi = process.env.API;
const appname = process.env.APPNAME || 'heroku-app-nsmw';

module.exports = async (context) => {
  const { m, client, prefix } = context;

  try {
    // Fetch the latest changes from the remote
    await git.fetch();

    // Check for new commits from origin/main
    const commits = await git.log(['main' + "..origin/" + 'main']);
    
    // If there are no new commits
    if (commits.total === 0) {
      return await m.reply("_Bot Is Up-to-Date_");
    }

    // Notify that update process is starting
    await m.reply("_Update Started_");

    // Get Heroku app information
    const app = await getHerokuApp();

    // Fetch the latest from the upstream main branch and reset
    await git.fetch("upstream", 'main');
    await git.reset("hard", ["FETCH_HEAD"]);

    // Add Heroku remote to Git
    const gitUrl = app.git_url.replace(
      "https://",
      `https://api:${herokuapi}@`
    );

    await addHerokuRemote(gitUrl);

    // Push the changes to Heroku
    await git.push("herokuapi", 'main');
    await m.reply("_Successfully Updated_");

  } catch (error) {
    console.error(error);
    await m.reply("_An error occurred while updating the bot_" + error);
  }

  // Check if there are any available updates
  const updatesMessage = await getAvailableUpdates();
  if (updatesMessage) {
    return await client.sendMessage(m.chat, { text: updatesMessage });
  }
};

async function getHerokuApp() {
  try {
    const heroku = new Heroku();
    const app = await heroku.get(`/apps/${appname}`);
    return app;
  } catch (error) {
    throw new Error("_Invalid Heroku Details_");
  }
}

async function addHerokuRemote(gitUrl) {
  try {
    await git.addRemote("herokuapi", gitUrl);
  } catch (error) {
    console.log("Error adding Heroku remote:", error);
  }
}

async function getAvailableUpdates() {
  const commits = await git.log(['main' + "..origin/" + 'main']);
  
  if (commits.total === 0) {
    return null; // No updates available
  }

  let availUpdate = "*ᴜᴘᴅᴀᴛᴇs ᴀʀᴇ ᴀᴠᴀɪʟᴀʙʟᴇ* \n\n";
  commits.all.forEach((commit, num) => {
    availUpdate += `${num + 1} ⋆ ${commit.message}\n`;
  });

  return availUpdate;
}
