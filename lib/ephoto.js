// fetchLogoUrl.js
const fetch = require('node-fetch');

const fetchLogoUrl = async (url, name) => {
    try {
        const response = await fetch(`https://api-pink-venom.vercel.app/api/logo?url=${url}&name=${name}`);
        const data = await response.json();

        if (data && data.result && data.result.download_url) {
            return data.result.download_url;
        }

        console.error("Invalid response structure:", data);
        return null;
    } catch (error) {
        console.error("Error fetching logo:", error);
        return null;
    }
};

// Export the function
module.exports = fetchLogoUrl;
