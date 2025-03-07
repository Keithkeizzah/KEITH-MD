"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = __importDefault(require("os"));
/**
 * Get the extension to be used for executable acc to the OS
 */
function getExecutableExt() {
    if (os_1.default.type() === 'Windows_NT') {
        return 'exe';
    }
    else {
        return 'out';
    }
}
exports.getExecutableExt = getExecutableExt;
//# sourceMappingURL=executable-ext.js.map