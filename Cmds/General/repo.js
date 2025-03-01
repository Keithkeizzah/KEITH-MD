module.exports = async (context) => {
  const { client, m, sendReply, sendMediaMessage } = context;

  try {
    // Fetch repository data from GitHub
    const response = await fetch("https://api.github.com/repos/Keithkeizzah/KEITH-MD");
    const repoData = await response.json();

    // Extract relevant information
    const repoInfo = {
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      lastUpdate: repoData.updated_at,
      owner: repoData.owner.login,
      createdAt: repoData.created_at,
      url: repoData.html_url
    };

    // Format dates
    const createdDate = new Date(repoInfo.createdAt).toLocaleDateString("en-GB");
    const lastUpdateDate = new Date(repoInfo.lastUpdate).toLocaleDateString("en-GB");

    // Construct message caption
    const messageCaption = `
      *Hello ,,,👋 This is 𝐊𝐄𝐈𝐓𝐇-𝐌𝐃*
      The best bot in the universe developed by Kᴇɪᴛʜ Kᴇɪᴢᴢᴀʜ. Fork and give a star 🌟 to my repo
      ╭───────────────────
      │✞ *Stars:* ${repoInfo.stars}
      │✞ *Forks:* ${repoInfo.forks}
      │✞ *Release Date:* ${createdDate}
      │✞ *Last Update:* ${lastUpdateDate}
      │✞ *Owner:* ${repoInfo.owner}
      │✞ *Repository:* ${repoInfo.url}
      │✞ *Session:* keithmd.onrender.com
      ╰───────────────────
    `;

    // Image to be sent along with the text message
    const imageUrl = "https://path-to-your-image.jpg"; // Replace with your image URL

    // Send the message with the image and caption
    await sendMediaMessage(client, m, {
      image: imageUrl,
      text: messageCaption
    });

  } catch (error) {
    console.error("Error:", error);
    await sendReply(client, m, 'An unexpected error occurred while generating the repo information.');
  }
};
