const API_URL = 'https://favqs.com/api/qotd';

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
    "https://telegra.ph/file/08f740224ed39233f92cb.mp4"
  ];

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch data');

    const { quote } = await response.json();

    const quoteMessage = `
  ┏━━━ *KEITH-QUOTES* ━━━◆
  ┃
  *◇* _${quote.body}_
  ┃
  ┃     *◇* *AUTHOR:* ${quote.author}
  ┃
  ╭──────────────◆
  │ *_Powered by keithkeizzah._*
  ╰──────────────◆
    `;

    // Randomly selecting a video URL from the list
    const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];

    // Preparing the video content to send
    const videoContent = {
      url: randomVideoUrl,
    };

    // Preparing the message content
    const messageToSend = {
      video: videoContent,
      caption: quoteMessage,
    };

    // Sending the message
    await client.sendMessage(m.chat, messageToSend);
  } catch (error) {
    console.error("Error fetching data or sending message:", error);
  }
};
