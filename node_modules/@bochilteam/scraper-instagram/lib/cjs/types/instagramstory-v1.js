"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramStorySchema = exports.InstagramStoryItemSchema = exports.InstagramStoryArgsSchema = void 0;
const zod_1 = require("zod");
exports.InstagramStoryArgsSchema = zod_1.z.object({
    0: zod_1.z.string()
});
exports.InstagramStoryItemSchema = zod_1.z.object({
    thumbnail: zod_1.z.string().url(),
    url: zod_1.z.string().url(),
    type: zod_1.z.literal('image').or(zod_1.z.literal('video'))
});
exports.InstagramStorySchema = zod_1.z.array(exports.InstagramStoryItemSchema);
