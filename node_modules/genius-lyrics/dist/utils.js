"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unescapeJsonEscaped = exports.contentBetween = void 0;
const contentBetween = (data, start, end) => {
    return data.split(start, 2)[1]?.split(end, 1)[0];
};
exports.contentBetween = contentBetween;
const jsonEscapedRegex = /\\./g;
const unescapeJsonEscaped = (data) => {
    return data.replaceAll(jsonEscapedRegex, (m) => m[1]);
};
exports.unescapeJsonEscaped = unescapeJsonEscaped;
