 const simpleGit = require("simple-git");

const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware'); 

module.exports = async (context) => {
  await ownerMiddleware(context, async () => {

    const { client, m, text, isOwner } = context;

const git = simpleGit();
    try {
        
        await git.addRemote('upstream', 'https://github.com/Keithkeizzah/KEITH-MD.git').catch(() => {});
        
        
        await git.fetch('upstream');
        
       
        const commits = await git.log(['main' + '..upstream/main']);
        if (commits.total > 0) {
            let updateMessage = `Updates available: ${commits.total} commits\n\n`;
            commits.all.forEach(commit => {
                updateMessage += `● ${commit.date.substring(0, 10)}: ${commit.message} - By: ${commit.author_name}\n`;
            });
            await m.reply(updateMessage);
        } else {
            await m.reply('You are already using the latest version.');
        }
    } catch (error) {
        await m.reply('Failed to check for updates. ' + error.message);
}


    
  });
};
