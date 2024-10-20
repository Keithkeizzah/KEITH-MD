/*const simpleGit = require("simple-git");
const Heroku = require("heroku-client");
const herokuapi = process.env.HEROKUAPI || '';
const name = process.env.HEROKUNAME || '';
const fs = require("fs");

const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware'); 

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, text, Owner } = context;

    const heroku = new Heroku({ token: herokuapi });
    const repo = await heroku.get(`/apps/${name}/git`);

    // Create a temporary directory to clone the repository
    const tempDir = await fs.promises.mkdtemp('/tmp/');

    // Clone the repository
    const git = simpleGit(tempDir);
    await git.clone(repo.git_url);

    // Fetch the latest changes
    await git.fetch();

    // Get the commit log
    const commits = await git.log(['main..origin/main']);

    if (commits.total === 0) {
      return m.reply('✅ Your bot is up to date with main branch!');
    } else {
      m.reply("❌ Your bot is not up to date, update it by redeploying or syncing your fork");
    }

    // Clean up the temporary directory
    await fs.promises.rmdir(tempDir, { recursive: true });
  });
};

*/
