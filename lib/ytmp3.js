const axios = require('axios');
const { stringify } = require('querystring');
const cheerio = require('cheerio');

const ytmp3 = async (url) => {
  const parameters = {
    'url': url,
    'format': 'mp3',
    'lang': 'en'
  };

  try {
    const conversionResponse = await axios.post('https://s64.notube.net/recover_weight.php', stringify(parameters));
    if (!conversionResponse.data.token) {
      throw new Error('No token was received from the conversion response.');
    }
    const token = conversionResponse.data.token;
    const downloadPageResponse = await axios.get('https://notube.net/en/download?token=' + token);

    if (downloadPageResponse.status !== 200) {
      throw new Error('Could not retrieve the download page.');
    }

    const $ = cheerio.load(downloadPageResponse.data);
    const result = {
      'title': $('#breadcrumbs-section h2').text(),
      'download': $('#breadcrumbs-section #downloadButton').attr('href')
    };

    return { status: true, results: result };
  } catch (error) {
    console.error('Error converting the YouTube video:', error);
    return { status: false, error: error.message };
  }
};

module.exports = ytmp3;