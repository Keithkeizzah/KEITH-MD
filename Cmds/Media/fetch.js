const axios = require("axios"); // Import axios for HTTP requests
const cheerio = require('cheerio'); // Import cheerio for parsing HTML content

module.exports = async (context) => {
  const { client, m, text, query, sendResponse } = context;
  
  const urlInput = query.join(" ");  // Join query arguments to form the URL input

  // Check if the URL starts with http:// or https://
  if (!/^https?:\/\//.test(urlInput)) {
    return sendResponse("Start the *URL* with http:// or https://");
  }

  try {
    // Check for a valid URL and extract the proper URL parts
    const url = new URL(urlInput);
    const fetchUrl = `${url.origin}${url.pathname}?${url.searchParams.toString()}`;

    // Fetching the content from the URL using axios
    const response = await axios.get(fetchUrl, {
      responseType: 'arraybuffer', // Get raw binary data (useful for images, videos, etc.)
    });

    // Handle content length check (100MB limit)
    const contentLength = parseInt(response.headers['content-length']);
    if (contentLength && contentLength > 104857600) {
      return sendResponse(`Content-Length exceeds the limit: ${contentLength} bytes`);
    }

    // Get the content type from the response headers
    const contentType = response.headers['content-type'];

    // Handle different content types
    if (/image\/.*/.test(contentType)) {
      // If it's an image, send the image URL
      await client.sendMessage(m.sender, {
        image: { url: fetchUrl },
        caption: "*POWERED BY ALPHA-MD*",
      }, { quoted: m });

    } else if (/video\/.*/.test(contentType)) {
      // If it's a video, send the video URL
      await client.sendMessage(m.sender, {
        video: { url: fetchUrl },
        caption: "*POWERED BY ALPHA-MD*",
      }, { quoted: m });

    } else if (/text|json/.test(contentType)) {
      // If it's text or JSON, try to parse it
      try {
        const buffer = Buffer.from(response.data);
        const json = JSON.parse(buffer.toString());
        console.log("Parsed JSON:", json);
        sendResponse(JSON.stringify(json, null, 2).slice(0, 10000));  // Send first 10,000 characters of JSON
        
      } catch (err) {
        // If JSON parsing fails, send raw text content (up to 10,000 chars)
        const buffer = Buffer.from(response.data);
        sendResponse(buffer.toString().slice(0, 10000));  // Send first 10,000 characters
      }

    } else {
      // If content is neither image, video, nor text/json, send it as a document
      await client.sendMessage(m.sender, {
        document: { url: fetchUrl },
        caption: "*POWERED BY ALPHA-MD*",
      }, { quoted: m });
    }
    
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error fetching data:", error.message);
    sendResponse(`Error fetching data: ${error.message}`);
  }
};
