const API_URL = 'https://favqs.com/api/qotd';

module.exports = async (context) => {
  const { client, m } = context;

  // List of video URLs (updated)
  const videoUrls = [
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
    "https://i.imgur.com/CF79jVv.mp4",
    "https://i.imgur.com/CF79jVv.mp4",
    "https://i.imgur.com/Ob7hzMz.mp4",
    "https://i.imgur.com/etEV3om.mp4",
    "https://i.imgur.com/OLqupmU.mp4",
    "https://i.imgur.com/OLqupmU.mp4",
    "https://i.imgur.com/imDK97l.mp4",
    "https://i.imgur.com/pNArg0x.mp4",
    "https://i.imgur.com/pNArg0x.mp4",
    "https://i.imgur.com/wIEwUS2.mp4",
    "https://i.imgur.com/upNLbX8.mp4",
    "https://i.imgur.com/AlKaIdq.mp4"
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

    // Randomly selecting a video URL from the updated list
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
