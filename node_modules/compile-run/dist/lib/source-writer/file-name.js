"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
/**
 * Return a random name of file with extension
 *
 * eg - .js --> source-<somerandomstring>-<timestamp>.js
 * @param ext Extension of the file
 */
function getFileName(ext) {
    var rand = crypto_1.default.pseudoRandomBytes(16).toString('hex');
    var ts = new Date().getTime();
    if (ext) {
        return "source-" + rand + "-" + ts + "." + ext;
    }
    else {
        return "source-" + rand + "-" + ts;
    }
}
exports.getFileName = getFileName;
//# sourceMappingURL=file-name.js.map