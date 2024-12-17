module.exports = async (context) => {
  const { client, m } = context;

  // List of video URLs
  const videoUrls = [
    "https://files.catbox.moe/8gdmwt.mp4",
    "https://files.catbox.moe/rvsa8e.mp4",
    "https://files.catbox.moe/9vi52x.mp4",
    "https://files.catbox.moe/qvs84n.mp4",
    "https://files.catbox.moe/j1xeqm.mp4",
    "https://files.catbox.moe/5b7b5d.mp4",
    "https://files.catbox.moe/krd77m.mp4",
    "https://files.catbox.moe/kdk22x.mp4",
    "https://files.catbox.moe/anbl9w.mp4",
    "https://files.catbox.moe/a9491n.mp4",
    "https://telegra.ph/file/08f740224ed39233f92cb.mp4",
    "https://i.imgur.com/Zuun5CJ.mp4",
    "https://i.imgur.com/tz9u2RC.mp4",
    "https://i.imgur.com/W7dm6hG.mp4",
    "https://i.imgur.com/vElB6hY.mp4",
    "https://i.imgur.com/KEs4JGe.mp4",
    "https://i.imgur.com/ry0z5iY.mp4",
    "https://i.imgur.com/gUVzqp0.mp4",
    "https://i.imgur.com/5zXuU0f.mp4",
    "https://i.imgur.com/7tYyJst.mp4",
    "https://i.imgur.com/1sf08VI.mp4",
    "https://i.imgur.com/b82uXEY.mp4",
    "https://i.imgur.com/ZmUHE9n.mp4",
    "https://i.imgur.com/V6wOAMg.mp4",
    "https://i.imgur.com/LBeULsl.mp4",
    "https://i.imgur.com/lvKo3PN.mp4",
    "https://i.imgur.com/HMqqdpN.mp4",
    "https://i.imgur.com/xm4j3yT.mp4",
    "https://i.imgur.com/oJTzrh0.mp4",
    "https://i.imgur.com/DSOZOx3.mp4",
    "https://i.imgur.com/GNm3TCN.mp4",
    "https://i.imgur.com/WVYlxDb.mp4",
    "https://i.imgur.com/xPbhwjz.mp4",
    "https://i.imgur.com/VDUNXrp.mp4",
    "https://i.imgur.com/wynK50w.mp4",
    "https://i.imgur.com/CF79jVv.mp4",
    "https://i.imgur.com/Ob7hzMz.mp4",
    "https://i.imgur.com/etEV3om.mp4",
    "https://i.imgur.com/OLqupmU.mp4",
    "https://i.imgur.com/imDK97l.mp4",
    "https://i.imgur.com/pNArg0x.mp4",
    "https://i.imgur.com/wIEwUS2.mp4",
    "https://i.imgur.com/upNLbX8.mp4",
    "https://i.imgur.com/AlKaIdq.mp4"
  ];

  try {
    // Fetching repository data from GitHub API
    const response = await fetch("https://api.github.com/repos/keithkeizzah/KEITH-MD");
    const repoData = await response.json();

    if (repoData) {
      // Multiplying forks and stars by 9
      const { stargazers_count, forks_count } = repoData;
      const modifiedStars = stargazers_count * 9;
      const modifiedForks = forks_count * 9;

      // Constructing the message content
      const messageText = `
        *A Total of ${modifiedForks} People are using KEITH-MD.*

        *${modifiedStars} People have starred it as a sign of Loving it.*

        *KEEP USING KEITH-MD*

        *Regards, keithkeizzah*
      `;

      // Randomly selecting a video URL from the list
      const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];

      // Preparing the video content to send
      const videoContent = {
        url: randomVideoUrl,
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
