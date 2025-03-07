"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const index_js_1 = require("../index.js");
const got_1 = __importDefault(require("got"));
const IG_REEL_URL = 'https://www.instagram.com/reel/CxSEjxfyJtN';
const IG_P_URL = 'https://www.instagram.com/p/CaHpoweBjmx';
(0, node_test_1.describe)('Instagram Downloader', async (t) => {
    let reels;
    (0, node_test_1.it)('Getting Metadata Reel', async () => {
        reels = await (0, index_js_1.instagramdl)(IG_REEL_URL);
        node_assert_1.default.ok(reels.length > 0);
    });
    (0, node_test_1.it)('Download Reel Video', async (t) => {
        if (!(reels === null || reels === void 0 ? void 0 : reels.length))
            return t.skip('Test skipped -- error in getting metadata!');
        const [{ url }] = reels;
        const buffer = await (0, got_1.default)(url).buffer();
        node_assert_1.default.ok(buffer.byteLength > 0);
    });
    (0, node_test_1.it)('Download Reel Thumbnail', async (t) => {
        if (!(reels === null || reels === void 0 ? void 0 : reels.length))
            return t.skip('Test skipped -- error in getting metadata!');
        const [{ thumbnail }] = reels;
        const buffer = await (0, got_1.default)(thumbnail).buffer();
        node_assert_1.default.ok(buffer.byteLength > 0);
    });
    let photos;
    (0, node_test_1.it)('Getting Metadata Photos', async () => {
        photos = await (0, index_js_1.instagramdl)(IG_P_URL);
        node_assert_1.default.ok(photos.length > 0);
    });
    (0, node_test_1.it)('Download Photo', async (t) => {
        if (!(photos === null || photos === void 0 ? void 0 : photos.length))
            return t.skip('Test skipped -- error in getting metadata!');
        const [{ url }] = photos;
        const buffer = await (0, got_1.default)(url).buffer();
        node_assert_1.default.ok(buffer.byteLength > 0);
    });
    (0, node_test_1.it)('Download Photo Thumbnail', async (t) => {
        if (!(photos === null || photos === void 0 ? void 0 : photos.length))
            return t.skip('Test skipped -- error in getting metadata!');
        const [{ thumbnail }] = photos;
        const buffer = await (0, got_1.default)(thumbnail).buffer();
        node_assert_1.default.ok(buffer.byteLength > 0);
    });
});
