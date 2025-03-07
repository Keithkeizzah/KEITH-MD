import https from 'https';
import http from 'http';

/**
 * Fetches the file size from a given URL.
 * 
 * @example 
 * fileSizeFromUrl("https://example.com")
 *   .then(size => console.log(size))
 *   .catch(error => console.error(error));
 * 
 * @param {string} url - The URL of the file.
 * @returns {Promise<string>} - Resolves with the file size as a formatted string, otherwise rejects with an error.
 */
export default function fileSizeFromUrl(url) {
    return new Promise((resolve, reject) => {
        if (!url) {
            return reject(new Error('Invalid URL'));
        }

        const isHttps = url.startsWith('https://');
        const isHttp = url.startsWith('http://');

        if (!isHttps && !isHttp) {
            return reject(new Error('The address should be http or https'));
        }

        const protocol = isHttps ? https : http;
        const req = protocol.get(url, response => {
            if (response.statusCode !== 200) {
                return reject(new Error(`Failed to get file size, status code: ${response.statusCode}`));
            }

            const contentLength = parseInt(response.headers['content-length'], 10);
            if (isNaN(contentLength)) {
                return reject(new Error("Couldn't retrieve file size from headers"));
            }

            resolve(formatBytes(contentLength));
        });

        req.on('error', error => reject(error));
    });
}

/**
 * Formats bytes into a human-readable string.
 * 
 * @param {number} bytes - The number of bytes.
 * @returns {string} - The formatted size string (e.g., '1.23 MB').
 */
function formatBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;

    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }

    return `${bytes.toFixed(2)} ${units[i]}`;
}
