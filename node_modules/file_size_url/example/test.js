import fileSizeUrl from '../src/index.js';

/**
 * Converts a human-readable file size (e.g., "33.24 MB") to bytes.
 * @param {string} sizeStr - The human-readable file size (e.g., "33.24 MB").
 * @returns {number} - The size in bytes.
 */
function parseSize(sizeStr) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const regex = /([\d.]+)\s?([a-zA-Z]+)/;
    const matches = sizeStr.match(regex);
    if (!matches) return 0;

    const value = parseFloat(matches[1]);
    const unit = matches[2];

    const index = units.indexOf(unit);
    if (index === -1) return 0;

    return value * Math.pow(1024, index);
}

fileSizeUrl("https://server14.mp3quran.net/download/mousa/Rewayat-Hafs-A-n-Assem/026.mp3")
    .then(sizeStr => {
        const sizeInBytes = parseSize(sizeStr);
        console.log(`File size in bytes: ${sizeInBytes}`); // File size in bytes: 34865152
        console.log(`File size: ${sizeStr}`) // File size: 33.24 MB
    })
    .catch(error => console.error(`Error: ${error.message}`));


