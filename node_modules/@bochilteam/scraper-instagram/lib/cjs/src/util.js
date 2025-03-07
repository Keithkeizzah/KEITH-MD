"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCookies = exports.stringifyCookies = exports.generateHash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const SUFFIX = 'fa74751e1d977d092e2ee0b7467a8cb4448fb54b31284d96ac6a2324fb3';
function generateHash(url) {
    const data = url + Date.now() + SUFFIX;
    const hash = crypto_1.default.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}
exports.generateHash = generateHash;
function stringifyCookies(cookies) {
    return cookies.map((cookie) => cookie.split(';')[0])
        .join('; ');
}
exports.stringifyCookies = stringifyCookies;
function parseCookies(cookie) {
    const cookies = cookie.split(';');
    return cookies.reduce((prev, curr) => {
        const [key, value] = curr.trim().split('=');
        prev[key] = value;
        return prev;
    }, {});
}
exports.parseCookies = parseCookies;
