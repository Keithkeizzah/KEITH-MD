"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const cheerio_1 = __importDefault(require("cheerio"));
const constant_js_1 = require("./constant.js");
const instagramdl_v1_js_1 = require("../types/instagramdl-v1.js");
async function instagramdl(url) {
    instagramdl_v1_js_1.InstagramdlArgsSchema.parse(arguments);
    const form = {
        recaptchaToken: '',
        q: url,
        t: 'media',
        lang: 'id'
    };
    const data = await got_1.default.post('https://v3.igdownloader.app/api/ajaxSearch', {
        headers: {
            ...constant_js_1.DEFAULT_HEADERS,
            'content-type': 'application/x-www-form-urlencoded',
            'origin': 'https://igdownloader.app',
            'referer': 'https://igdownloader.app/'
        },
        form
    }).json();
    if (data.status !== 'ok') {
        throw data;
    }
    const $ = cheerio_1.default.load(data.data);
    const results = [];
    $('.download-items').each(function () {
        const $el = $(this);
        const $img = $el.find('.download-items__thumb > img');
        const thumbnail = $img.attr('data-src') || $img.attr('src');
        const $a = $el.find('.download-items__btn > a');
        const url = $a.attr('href');
        const type = /video/i.test($a.find('span').text()) ? 'video' : 'image';
        results.push({
            thumbnail,
            url,
            type
        });
    });
    return instagramdl_v1_js_1.InstagramdlSchema.parse(results);
}
exports.default = instagramdl;
