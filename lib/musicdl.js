const userAgent = require('random-useragent');

const ytdl = require("youtubedl-core");
const yts = require("youtube-yts");
const readline = require("readline");
const ffmpeg = require("fluent-ffmpeg");
const NodeID3 = require("node-id3");
const fs = require("fs");
const { fetchBuffer } = require("./botFunctions.js");
const ytM = require("node-youtube-music");
const { randomBytes } = require("crypto");
const ytIdRegex =
  /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/;

class YT {
  constructor() {}

  
  static isYTUrl = (url) => {
    return ytIdRegex.test(url);
  };

  
  static getVideoID = (url) => {
    if (!this.isYTUrl(url)) throw new Error("is not YouTube URL");
    return ytIdRegex.exec(url)[1];
  };

  
  static WriteTags = async (filePath, Metadata) => {
    NodeID3.write(
      {
        title: Metadata.Title,
        artist: Metadata.Artist,
        originalArtist: Metadata.Artist,
        image: {
          mime: "jpeg",
          type: {
            id: 3,
            name: "front cover",
          },
          imageBuffer: (await fetchBuffer(Metadata.Image)).buffer,
          description: `Cover of ${Metadata.Title}`,
        },
        album: Metadata.Album,
        year: Metadata.Year || "",
      },
      filePath
    );
  };

  
  static search = async (query, options = {}) => {
    const search = await yts.search({ query, hl: "id", gl: "ID", ...options });
    return search.videos;
  };

  
  static searchTrack = (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        let ytMusic = await ytM.searchMusics(query);
        let result = [];
        for (let i = 0; i < ytMusic.length; i++) {
          result.push({
            isYtMusic: true,
            title: `${ytMusic[i].title} - ${ytMusic[i].artists
              .map((x) => x.name)
              .join(" ")}`,
            artist: ytMusic[i].artists.map((x) => x.name).join(" "),
            id: ytMusic[i].youtubeId,
            url: "https://youtu.be/" + ytMusic[i].youtubeId,
            album: ytMusic[i].album,
            duration: {
              seconds: ytMusic[i].duration.totalSeconds,
              label: ytMusic[i].duration.label,
            },
            image: ytMusic[i].thumbnailUrl.replace("w120-h120", "w600-h600"),
          });
        }
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };

  
  static downloadMusic = async (query) => {
    try {
      const getTrack = Array.isArray(query)
        ? query
        : await this.searchTrack(query);
      const search = getTrack[0]; //await this.searchTrack(query)
      const videoInfo = await ytdl.getInfo(
        "https://www.youtube.com/watch?v=" + search.id,
        { lang: "id" }
      );
      let stream = ytdl(search.id, { filter: "audioonly", quality: 140 });
      let songPath = `./data/${randomBytes(3).toString("hex")}.mp3`;
      stream.on("error", (err) => console.log(err));

      const file = await new Promise((resolve) => {
        ffmpeg(stream)
          .audioFrequency(44100)
          .audioChannels(2)
          .audioBitrate(128)
          .audioCodec("libmp3lame")
          .audioQuality(5)
          .toFormat("mp3")
          .save(songPath)
          .on("end", () => resolve(songPath));
      });
      await this.WriteTags(file, {
        Title: search.title,
        Artist: search.artist,
        Image: search.image,
        Album: search.album,
        Year: videoInfo.videoDetails.publishDate.split("-")[0],
      });
      return {
        meta: search,
        path: file,
        size: fs.statSync(songPath).size,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  
  static mp4 = async (query, quality = 134) => {
    try {
      if (!query) throw new Error("Video ID or YouTube Url is required");
      const videoId = this.isYTUrl(query) ? this.getVideoID(query) : query;
      const videoInfo = await ytdl.getInfo(
        "https://www.youtube.com/watch?v=" + videoId,
        { lang: "id" }
      );
      const format = ytdl.chooseFormat(videoInfo.formats, {
        format: quality,
        filter: "videoandaudio",
      });
      return {
        title: videoInfo.videoDetails.title,
        thumb: videoInfo.videoDetails.thumbnails.slice(-1)[0],
        date: videoInfo.videoDetails.publishDate,
        duration: videoInfo.videoDetails.lengthSeconds,
        channel: videoInfo.videoDetails.ownerChannelName,
        quality: format.qualityLabel,
        contentLength: format.contentLength,
        description: videoInfo.videoDetails.description,
        videoUrl: format.url,
      };
    } catch (error) {
      throw error;
    }
  };

  
  static mp3 = async (url, metadata = {}, autoWriteTags = false) => {
    try {
      if (!url) throw new Error("Video ID or YouTube Url is required");
      url = this.isYTUrl(url)
        ? "https://www.youtube.com/watch?v=" + this.getVideoID(url)
        : url;
await new Promise(resolve => setTimeout(resolve, 5000)); 

const { videoDetails } = await ytdl.getInfo(url, { lang: "id" });

let stream = ytdl(url, { filter: "audioonly", quality: 140 });

const rotatedUserAgent = userAgent.getRandom();
     // stream.setHeader('User-Agent', rotatedUserAgent);

      
 
      let songPath = `./data/${randomBytes(3).toString("hex")}.mp3`;

      let starttime;
      stream.once("response", () => {
        starttime = Date.now();
      });
      stream.on("progress", (chunkLength, downloaded, total) => {
        const percent = downloaded / total;
        const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
        const estimatedDownloadTime =
          downloadedMinutes / percent - downloadedMinutes;
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
        process.stdout.write(
          `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
            total /
            1024 /
            1024
          ).toFixed(2)}MB)\n`
        );
        process.stdout.write(
          `running for: ${downloadedMinutes.toFixed(2)}minutes`
        );
        process.stdout.write(
          `, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `
        );
        readline.moveCursor(process.stdout, 0, -1);
        //let txt = `${bgColor(color('[FFMPEG]]', 'black'), '#38ef7d')} ${color(moment().format('DD/MM/YY HH:mm:ss'), '#A1FFCE')} ${gradient.summer('[Converting..]')} ${gradient.cristal(p.targetSize)} kb`
      });
      stream.on("end", () => process.stdout.write("\n\n"));
      stream.on("error", (err) => console.log(err));

      const file = await new Promise((resolve) => {
        ffmpeg(stream)
          .audioFrequency(44100)
          .audioChannels(2)
          .audioBitrate(128)
          .audioCodec("libmp3lame")
          .audioQuality(5)
          .toFormat("mp3")
          .save(songPath)
          .on("end", () => {
            resolve(songPath);
          });
      });
      if (Object.keys(metadata).length !== 0) {
        await this.WriteTags(file, metadata);
      }
      if (autoWriteTags) {
        await this.WriteTags(file, {
          Title: videoDetails.title,
          Album: videoDetails.author.name,
          Year: videoDetails.publishDate.split("-")[0],
          Image: videoDetails.thumbnails.slice(-1)[0].url,
        });
      }
      return {
        meta: {
          title: videoDetails.title,
          channel: videoDetails.author.name,
          seconds: videoDetails.lengthSeconds,
          image: videoDetails.thumbnails.slice(-1)[0].url,
        },
        path: file,
        size: fs.statSync(songPath).size,
      };
    } catch (error) {
      throw error;
    }
  };
}

module.exports = YT;