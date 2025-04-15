const axios = require('axios');
const cheerio = require('cheerio');

async function fetchHentaiVideos() {
  try {
    const randomPage = Math.floor(Math.random() * 1153);
    const response = await axios.get(`https://sfmcompile.club/page/${randomPage}`);
    const $ = cheerio.load(response.data);
    
    return $("#primary > div > div > ul > li > article").map((index, element) => {
      const $el = $(element);
      return {
        title: $el.find("header > h2").text().trim(),
        link: $el.find("header > h2 > a").attr('href'),
        category: $el.find("header > div.entry-before-title > span > span").text().replace("in ", "").trim(),
        share_count: parseInt($el.find("span.entry-shares").text().replace(/\D/g, '') || 0),
        views_count: parseInt($el.find("span.entry-views").text().replace(/\D/g, '') || 0),
        media: {
          type: $el.find("source").attr('type') || 'image/jpeg',
          video_url: $el.find("source").attr('src') || $el.find("img").attr('data-src'),
          fallback_url: $el.find("video > a").attr('href')
        }
      };
    }).get();

  } catch (error) {
    throw new Error(`Failed to fetch videos: ${error.message}`);
  }
}

module.exports = fetchHentaiVideos;
