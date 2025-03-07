"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
/**
 * Promise based wrapper over fs.writeFile to write source file, can be used in an async function
 * @param filePath A path like string
 * @param source Source string to be written
 */
function writeSource(filePath, source) {
    return new Promise(function (res, rej) {
        fs_1.writeFile(filePath, source, function (err) {
            if (err) {
                rej(err);
            }
            else {
                res();
            }
        });
    });
}
exports.writeSource = writeSource;
/**
 * Promise based wrapper over fs.writeFile to read source file, can be used in an async function
 * @param filePath A path like string
 */
function readSource(filePath) {
    return new Promise(function (resolve, reject) {
        fs_1.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.readSource = readSource;
//# sourceMappingURL=read-write-util.js.map