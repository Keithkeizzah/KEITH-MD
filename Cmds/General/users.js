module.exports = async (context) => {
  const { client, m } = context;

  try {
    // Fetching repository data from GitHub API
    const response = await fetch("https://api.github.com/repos/keithkeizzah/KEITH-MD");
    const repoData = await response.json();

    if (repoData) {
      const { stargazers_count, forks_count } = repoData;

      // Constructing the message content
      const messageText = `
        *A Total of ${forks_count} People are using KEITH-MD.*

        *${stargazers_count} People have starred it as a sign of Loving it.*

        *KEEP USING KEITH-MD*

        *Regards, keithkeizzah*
      `;

      // Preparing the video content to send
      const videoContent = {
        url: "https://telegra.ph/file/08f740224ed39233f92cb.mp4",
      };

      const messageToSend = {
        video: videoContent,
        caption: messageText,
      };

      // Sending the message
      await client.sendMessage(m.chat, messageToSend);
    } else {
      console.error("Could not fetch data from GitHub API.");
    }
  } catch (error) {
    console.error("Error fetching data or sending message:", error);
  }
};
