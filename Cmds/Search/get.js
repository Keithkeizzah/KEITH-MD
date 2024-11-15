const fetch = require('node-fetch'); // Import node-fetch

module.exports = async (context) => {
  const { client, m, url } = context; // Ensure URL is part of the context

  // Check if the URL exists and is a string
  if (!url || typeof url !== 'string') {
    return m.reply("No URL provided.");
  }

  // Debug: Log the URL to verify it's passed correctly
  console.log("Received URL:", url);

  // Ensure URL starts with 'http://' or 'https://'
  if (!/^https?:\/\//.test(url)) {
    return m.reply("Start the *URL* with http:// or https://");
  }

  try {
    // Parse the URL
    const parsedUrl = new URL(url);
    const fullUrl = `${parsedUrl.origin}${parsedUrl.pathname}?${parsedUrl.searchParams.toString()}`;

    // Debug: Log the full URL to be fetched
    console.log("Fetching data from:", fullUrl);

    // Fetch data from the URL
    const response = await fetch(fullUrl);

    // Check content length (file size limit)
    const contentLength = response.headers.get("content-length");
    if (contentLength && contentLength > 107374182400) { // 100GB limit
      return m.reply("Content-Length exceeds the limit: " + contentLength);
    }

    // Check content type (only allow text or JSON)
    const contentType = response.headers.get("content-type");
    if (!/text|json/.test(contentType)) {
      // Send media if the content type is not text or JSON
      await client.sendMedia(m.chat, fullUrl, "file", "> > *Regards Alpha Md*", m);
      return;
    }

    // Convert response to buffer and attempt to parse as JSON
    let dataBuffer = Buffer.from(await response.arrayBuffer());
    try {
      const jsonData = JSON.parse(dataBuffer.toString());
      console.log("Parsed JSON:", jsonData);
      dataBuffer = Buffer.from(JSON.stringify(jsonData)); // Reassign dataBuffer as a stringified JSON object
    } catch (err) {
      console.error("Error parsing JSON:", err);
      // If not JSON, convert buffer to string
      dataBuffer = dataBuffer.toString();
    } finally {
      // Reply with the first 16,384 characters of the data (limit based on your platform's message size)
      m.reply(dataBuffer.slice(0, 16000)); // Adjust message length if necessary
    }

  } catch (err) {
    console.error("Error fetching data:", err.message);
    m.reply("Error fetching data.");
  }
};
