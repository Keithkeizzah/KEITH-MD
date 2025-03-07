"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const cheerio_1 = __importDefault(require("cheerio"));
const constant_js_1 = require("./constant.js");
const instagramstory_v1_js_1 = require("../types/instagramstory-v1.js");
const crypto_1 = __importDefault(require("crypto"));
async function instagramStory(username) {
    instagramstory_v1_js_1.InstagramStoryArgsSchema.parse(arguments);
    const form = {
        'g-recaptcha-response': crypto_1.default.randomBytes(16).toString('hex'), // captcha is not checked on the backend 
        text_username: username,
        user_data: ''
    };
    const data = await got_1.default.post('https://www.storysaver.net/storyProcesst.php?c=1', {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS,
            'content-type': 'application/x-www-form-urlencoded',
            origin: 'https://www.storysaver.net',
            referer: 'https://www.storysaver.net/'
        },
        form
    }).text();
    const $ = cheerio_1.default.load(data);
    const results = [];
    $('.stylestory').each(function () {
        const $el = $(this);
        const thumbnail = ($el.find('video').attr('poster') || $el.find('img').attr('src'));
        const $a = $el.find('a');
        const url = $a.attr('href');
        const type = /video/i.test($a.text()) ? 'video' : 'image';
        results.push({
            thumbnail,
            url,
            type
        });
    });
    return instagramstory_v1_js_1.InstagramStorySchema.parse(results);
}
exports.default = instagramStory;
