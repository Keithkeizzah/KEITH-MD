const axios = require('axios');

async function ytmp3(query) {
 return new Promise(async (resolve, reject) => { 
  try {
async function scrapeData(q) {
  const url = 'https://cdn59.savetube.su/info';
  const headers = {
    'authority': 'cdn59.savetube.su',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'Content-Type': 'application/json',
    'Origin': 'https://yt.savetube.me',
    'Referer': 'https://yt.savetube.me/',
    'Sec-Ch-Ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
    'Sec-Ch-Ua-Mobile': '?1',
    'Sec-Ch-Ua-Platform': '"Android"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
  };

  const data = { url: q };

  try {
    const response = await axios.post(url, data, { headers });
    const key = response.data?.data?.key; // Extract 'key'
    return key;
  } catch (error) {
    console.log('Error fetching data:', error.message);
    return null;
  }
}

// Function to scrape the download link
async function scrapeSite(q,type,quality) {
  const url = 'https://cdn61.savetube.su/download';
  const headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'Content-Type': 'application/json',
    'Origin': 'https://yt.savetube.me',
    'Referer': 'https://yt.savetube.me/',
    'Sec-Ch-Ua': '"Not.A.Brand";v="99", "Chromium";v="124"',
    'Sec-Ch-Ua-Mobile': '?1',
    'Sec-Ch-Ua-Platform': '"Android"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
  };

  const key = await scrapeData(q);
  if (!key) {
    throw new Error('Unable to fetch key.');
  }
//වෙනස් වෙන්න ඕන
  const data = {
    downloadType: type,
    quality: quality,
    key: key,
  };


  try {
    const response = await axios.post(url, data, { headers });
    return response.data?.data?.downloadUrl;

    
  } catch (error) {
    console.log('Error fetching data:', error.message);
    throw error;
  }
}
let dlink = await scrapeSite(query,"audio","128")
  
    const result = {
                dl_link: dlink
            };

            resolve(result);

        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
}
    




async function ytmp4(query) {
 return new Promise(async (resolve, reject) => { 
  try {
async function scrapeData(q) {
  const url = 'https://cdn59.savetube.su/info';
  const headers = {
    'authority': 'cdn59.savetube.su',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'Content-Type': 'application/json',
    'Origin': 'https://yt.savetube.me',
    'Referer': 'https://yt.savetube.me/',
    'Sec-Ch-Ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
    'Sec-Ch-Ua-Mobile': '?1',
    'Sec-Ch-Ua-Platform': '"Android"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
  };

  const data = { url: q };

  try {
    const response = await axios.post(url, data, { headers });
    const key = response.data?.data?.key; // Extract 'key'
    return key;
  } catch (error) {
    console.log('Error fetching data:', error.message);
    return null;
  }
}

// Function to scrape the download link
async function scrapeSite(q,type,quality) {
  const url = 'https://cdn61.savetube.su/download';
  const headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'Content-Type': 'application/json',
    'Origin': 'https://yt.savetube.me',
    'Referer': 'https://yt.savetube.me/',
    'Sec-Ch-Ua': '"Not.A.Brand";v="99", "Chromium";v="124"',
    'Sec-Ch-Ua-Mobile': '?1',
    'Sec-Ch-Ua-Platform': '"Android"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
  };

  const key = await scrapeData(q);
  if (!key) {
    throw new Error('Unable to fetch key.');
  }
//වෙනස් වෙන්න ඕන
  const data = {
    downloadType: type,
    quality: quality,
    key: key,
  };


  try {
    const response = await axios.post(url, data, { headers });
    return response.data?.data?.downloadUrl;

    
  } catch (error) {
    console.log('Error fetching data:', error.message);
    throw error;
  }
}
let dlink = await scrapeSite(query,"video","240")
let dlink1 = await scrapeSite(query,"video","360")
let dlink2 = await scrapeSite(query,"video","480")
let dlink3 = await scrapeSite(query,"video","720")
let dlink4 = await scrapeSite(query,"video","1080")   
  
   const result = {
                dl: dlink,
                dl1: dlink1,
                dl2: dlink2,
                dl3: dlink3,
                dl4: dlink4,
            };

            resolve(result);

        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
}




module.exports = { ytmp3, ytmp4 }

