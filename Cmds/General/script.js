module.exports = async (context) => {
  const { client, m, sendReply, author, botname, sendMediaMessage } = context;

  try {
    
    const response = await fetch("https://api.github.com/repos/Keithkeizzah/KEITH-MD");
    const repoData = await response.json();

    
    const repoInfo = {
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      lastUpdate: repoData.updated_at,
      owner: repoData.owner.login,
      createdAt: repoData.created_at,
      url: repoData.html_url
    };

    
    const createdDate = new Date(repoInfo.createdAt).toLocaleDateString("en-GB");
    const lastUpdateDate = new Date(repoInfo.lastUpdate).toLocaleDateString("en-GB");

    
    const messageCaption = `
      *Hello ,,,👋 This is ${botname}*
      The best bot in the universe developed by ${author}. Fork and give a star 🌟 to my repo
      ╭───────────────────
      │✞ *Stars:* ${repoInfo.stars}
      │✞ *Forks:* ${repoInfo.forks}
      │✞ *Release Date:* ${createdDate}
      │✞ *Last Update:* ${lastUpdateDate}
      │✞ *Owner:* ${author}
      │✞ *Repository:* ${repoInfo.url}
      │✞ *Session:* keithmd-l4qc.onrender.com
      ╰───────────────────
    `;

    
    const imageUrl = "https://path-to-your-image.jpg"; 

    
    await sendMediaMessage(client, m, {
      image: imageUrl,
      text: messageCaption
    });

  } catch (error) {
    console.error("Error:", error);
    await sendReply(client, m, 'An unexpected error occurred while generating the repo information.');
  }
};
