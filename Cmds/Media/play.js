
const fetch = require('node-fetch');

module.exports = async (context) => {
  const { downloadYouTube, downloadSoundCloud, downloadSpotify, searchYouTube, searchSoundCloud, searchSpotify, client, m, text, botname, sendReply, sendMediaMessage } = context;

  try {
    if (!text) {
      return sendReply(client, m, "Please specify the song you want to download.");
    }

    // Try YouTube first
    let result = await searchYouTube(text);
    let downloadResult = result ? await downloadYouTube(result.url) : null;
    let platform = 'YouTube';

    // If YouTube fails, try Spotify
    if (!downloadResult) {
      result = await searchSpotify(text);
      downloadResult = result ? await downloadSpotify(result.url) : null;
      platform = 'Spotify';
    }

    // If Spotify fails, try SoundCloud
    if (!downloadResult) {
      result = await searchSoundCloud(text);
      downloadResult = result ? await downloadSoundCloud(result.url) : null;
      platform = 'SoundCloud';
    }

    if (!result || !downloadResult) {
      return sendReply(client, m, "Couldn't find or download the requested song.");
    }

    const caption = `
╭═════════════════⊷
║ *Title*: ${result.title}
║ *Source*: ${platform}
║ *Direct Link*: ${result.url}
║ *Format*: ${downloadResult.format}
║ ${result.artist ? `*Artist*: ${result.artist}\n` : ''}╰═════════════════⊷
*Powered by ${botname}*`;

    
    if (result.thumbnail || downloadResult.thumbnail) {
      await sendMediaMessage(client, m, {
        image: { url: downloadResult.thumbnail || result.thumbnail },
        caption: caption
      });
    }

    
    await sendMediaMessage(client, m, {
      audio: { url: downloadResult.downloadUrl },
      mimetype: "audio/mp4",
    });

   
    await sendMediaMessage(client, m, {
      document: { url: downloadResult.downloadUrl },
      mimetype: "audio/mp3",
      fileName: `${result.title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp3`,
    });

  } catch (error) {
    console.error('Error:', error);
    return sendReply(client, m, `An error occurred: ${error.message}`);
  }
};
