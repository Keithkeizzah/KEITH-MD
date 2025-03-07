"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramdlSchema = exports.InstagramdlItemSchema = exports.InstagramdlArgsSchema = void 0;
const zod_1 = require("zod");
exports.InstagramdlArgsSchema = zod_1.z.object({
    0: zod_1.z.string().url()
});
exports.InstagramdlItemSchema = zod_1.z.object({
    thumbnail: zod_1.z.string().url(),
    url: zod_1.z.string().url(),
    type: zod_1.z.literal('video').or(zod_1.z.literal('image'))
});
exports.InstagramdlSchema = zod_1.z.array(exports.InstagramdlItemSchema);
