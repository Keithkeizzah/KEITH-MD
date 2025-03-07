"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const index_js_1 = require("../index.js");
const got_1 = __importDefault(require("got"));
const USERNAME = 'raffinagita1717';
(0, node_test_1.describe)('Instagram Story Downloader', async (t) => {
    let stories;
    (0, node_test_1.it)('Getting Metadata', async () => {
        stories = await (0, index_js_1.instagramStory)(USERNAME);
        node_assert_1.default.strictEqual(stories.length > 0, true);
    });
    (0, node_test_1.it)('Download Story', async (t) => {
        if (!(stories === null || stories === void 0 ? void 0 : stories.length))
            return t.skip('Test skipped -- error in getting metadata!');
        const [{ url }] = stories;
        const buffer = await (0, got_1.default)(url).buffer();
        node_assert_1.default.ok(buffer.byteLength > 0);
    });
    (0, node_test_1.it)('Download Story Thumbnail', async (t) => {
        if (!(stories === null || stories === void 0 ? void 0 : stories.length))
            return t.skip('Test skipped -- error in getting metadata!');
        const [{ thumbnail }] = stories;
        const buffer = await (0, got_1.default)(thumbnail).buffer();
        node_assert_1.default.ok(buffer.byteLength > 0);
    });
});
