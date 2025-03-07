import crypto from 'crypto';
const SUFFIX = 'fa74751e1d977d092e2ee0b7467a8cb4448fb54b31284d96ac6a2324fb3';
export function generateHash(url) {
    const data = url + Date.now() + SUFFIX;
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}
export function stringifyCookies(cookies) {
    return cookies.map((cookie) => cookie.split(';')[0])
        .join('; ');
}
export function parseCookies(cookie) {
    const cookies = cookie.split(';');
    return cookies.reduce((prev, curr) => {
        const [key, value] = curr.trim().split('=');
        prev[key] = value;
        return prev;
    }, {});
}
