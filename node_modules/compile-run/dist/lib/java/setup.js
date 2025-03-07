"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var init_1 = require("../init");
var path_1 = __importDefault(require("path"));
var source_writer_1 = require("../source-writer");
/**
 * Sets up the java dir and makes a source dir
 * @returns A path like string of source directory
 */
function setupJavaDir() {
    var javaPath = path_1.default.join(init_1.tmpPath, 'java');
    init_1.checkExistsAndMakeDir(javaPath);
    //get a random name for making dir to store class and
    var dirname = source_writer_1.getFileName();
    var dirPath = path_1.default.join(javaPath, dirname);
    init_1.checkExistsAndMakeDir(dirPath);
    return dirPath;
}
exports.setupJavaDir = setupJavaDir;
//# sourceMappingURL=setup.js.map