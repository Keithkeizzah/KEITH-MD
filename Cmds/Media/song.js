const axios = require("axios");
const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");
const fg = require("api-dylux");

// Convert bytes to human-readable size (KB, MB, etc.)
function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${(bytes / (1024 ** i)).toFixed(2)} ${sizes[i]}`;
}

// Function to get a buffer of the file
const getBuffer = async (url, options = {}) => {
  options = options || {};
  const res = await axios({
    method: 'get',
    url,
    headers: {
      'DNT': 1,
      'Upgrade-Insecure-Request': 1,
    },
    ...options,
    responseType: 'arraybuffer'
  });
  return res.data;
};

// Function to download audio using the API (ytmp3)
async function downloadAudio(url) {
  try {
    if (!url) throw new Error("URL parameter is required");
    
    const response = await fg.yta(url);
    const title = response.title;
    const downloadLink = response.dl_url;
    
    return {
      status: true,
      createdBy: "keithkeizzah",
      title: title,
      downloadLink: downloadLink
    };
  } catch (error) {
    console.error("Error fetching audio:", error);
    return null;
  }
}

// Function to search YouTube for videos
async function search(query, options = {}) {
  const searchResult = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
  return searchResult.videos;
}

// Main function to download and handle the music
module.exports = async (context) => {
  const { client, m, text, ytmp3 } = context;
  let limit = 20; // Max allowed size in MB

  try {
    if (!text) {
      m.reply('What song do you want to download?');
      return;
    }

    // Search for the video on YouTube
    const yt_play = await search(text);
    if (!yt_play || yt_play.length === 0) {
      return m.reply('No results found!');
    }
    
    const { status, results, error } = await ytmp3(yt_play[0].url);
    if (!status || !results) {
      return m.reply('Error fetching audio details');
    }
    
    const ttl = results.title;
    const audioUrl = results.download;
    
    // Fetch the audio buffer (file)
    const buff_aud = await getBuffer(audioUrl);
    const fileSizeInBytes = buff_aud.byteLength;
    const size = bytesToSize(fileSizeInBytes);

    // If the file size is smaller than the limit, send audio
    if (fileSizeInBytes <= limit * 1024 * 1024) {
      await client.sendMessage(m.chat, {
        document: buff_aud,
        mimetype: 'audio/mpeg',
        fileName: `${ttl}.mp3`
      }, { quoted: m });
    } else {
      await m.reply(`Failed... Song is too large for uploading... Size: ${size}`);
    }
    
  } catch (er) {
    console.error(er);
    m.reply('Error\n' + er.message || er);
  }
};
