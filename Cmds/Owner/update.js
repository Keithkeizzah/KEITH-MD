const simpleGit = require("simple-git");
const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');
const path = require('path');
const fs = require('fs');

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {
    const { client, m, text, Owner } = context;

    // Ensure git is installed and accessible
    const git = simpleGit();

    try {
      // Check if git is available (whether it's in PATH)
      const isGitAvailable = await checkGitAvailability();

      if (!isGitAvailable) {
        await m.reply('Git is not installed or not found in the system PATH. Please install Git.');
        return;
      }

      // Add the remote repository (upstream) if not already added
      await git.addRemote('upstream', 'https://github.com/Keithkeizzah/KEITH-MD.git').catch(() => {});

      // Fetch latest changes from the upstream repository
      await git.fetch('upstream');

      // Check for new commits from the upstream repository
      const commits = await git.log(['main..upstream/main']);
      
      if (commits.total > 0) {
        let updateMessage = `Updates available: ${commits.total} commits\n\n`;
        
        // List each commit
        commits.all.forEach(commit => {
          updateMessage += `● ${commit.date.substring(0, 10)}: ${commit.message} - By: ${commit.author_name}\n`;
        });

        // Reply with commit details
        await m.reply(updateMessage);

        // Automatically pull the changes from upstream
        await git.checkout('main');  // Ensure we're on the main branch
        await git.pull('upstream', 'main'); // Pull the latest changes
        await m.reply('Bot repository has been updated successfully.');
      } else {
        await m.reply('You are already using the latest version.');
      }
    } catch (error) {
      await m.reply('Failed to check for updates: ' + error.message);
    }
  });
};

// Function to check if Git is available
async function checkGitAvailability() {
  try {
    const gitPath = await simpleGit().raw(['--exec-path']);
    if (gitPath) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
