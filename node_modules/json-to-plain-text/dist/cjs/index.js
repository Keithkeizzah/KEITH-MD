"use strict";
// MIT License
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToPlainText = void 0;
// Copyright (c) 2021 Emmadi Sumith Kumar
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const chalk_1 = __importDefault(require("chalk"));
/**
 * Convert JSON-like data or plain JavaScript objects to formatted plain text representation.
 *
 * @function jsonToPlainText
 * @param data {unknown} - The input data to convert. Can be JSON-like data or plain JavaScript objects.
 * @param options {Options} - (Optional) Configuration options for customizing the output.
 *   - color {boolean} - Whether to apply colors to the output (default: true).
 *   - spacing {boolean} - Whether to include spacing after colons (default: true).
 *   - seperator {string} -  seperator. Default ':',
 *   - squareBracketsForArray {boolean} - Whether to use square brackets for arrays (default: false).
 *   - doubleQuotesForKeys {boolean} - Whether to use double quotes for object keys (default: false).
 *   - doubleQuotesForValues {boolean} - Whether to use double quotes for string values (default: false).
 * @returns {string} - The formatted plain text representation of the input data.
 * @example
 * // Basic usage:
 * const data = { name: "John", age: 30, isEmployed: true };
 * const options = {
 *    color: true,
 *    spacing: true,
 *    seperator?: "=";
 *    squareBracketsForArray: false,
 *    doubleQuotesForKeys: false,
 *    doubleQuotesForValues: false,
 * }
 * const plainText = jsonToPlainText(data);
 * console.log(plainText);
 *
 * // Output:
 * //
 * //   name = "John",
 * //   age = 30,
 * //   isEmployed = true
 */
function jsonToPlainText(data, options) {
    const visited = new Set();
    let indentLevel = 1;
    const defaultOptions = {
        color: true,
        spacing: true,
        seperator: ":",
        squareBracketsForArray: false,
        doubleQuotesForKeys: false,
        doubleQuotesForValues: false,
    };
    const mergedOptions = { ...defaultOptions, ...options }; // Merge user-provided options with default options
    const outputOptions = {
        color: mergedOptions.color,
        spacing: mergedOptions.spacing,
        seperator: mergedOptions.seperator,
        squareBracketsForArray: mergedOptions.squareBracketsForArray,
        doubleQuotesForKeys: mergedOptions.doubleQuotesForKeys,
        doubleQuotesForValues: mergedOptions.doubleQuotesForValues,
    };
    // Helper function to determine the type of a variable
    function getType(variable) {
        const type = typeof variable;
        // Identify the specific type for object-like variables (null, array, object, date, regexp)
        if (type === "object") {
            if (variable === null)
                return "null";
            if (Array.isArray(variable))
                return "array";
            if (variable instanceof Date)
                return "date";
            if (variable instanceof RegExp)
                return "regexp";
            return "object";
        }
        return type;
    }
    // Helper function to handle arrays
    function handleArray(arr) {
        let output = "";
        if (arr.length === 0) {
            output += "[]";
            return output;
        }
        arr.forEach((item, index) => {
            const handler = handlers[getType(item)];
            if (!handler) {
                throw new Error("Unsupported data type: " + getType(item));
            }
            if (index === 0) {
                output += handler(item, true);
            }
            else {
                output += ", " + handler(item, true);
            }
        });
        return outputOptions.squareBracketsForArray ? "[ " + output + " ]" : output;
    }
    // Helper function to handle objects
    function handleObject(obj) {
        let output = "";
        if (Object.keys(obj).length === 0) {
            output += "{}";
            return output;
        }
        const keys = Object.keys(obj);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        keys.forEach((key, index) => {
            const value = obj[key];
            const handler = handlers[getType(value)];
            if (typeof value === "undefined") {
                return;
            }
            if (!handler) {
                throw new Error("Unsupported data type: " + getType(value));
            }
            if (key.length >= indentLevel) {
                indentLevel = key.length;
            }
            output +=
                "\n" +
                    (outputOptions.doubleQuotesForKeys
                        ? '"' + (outputOptions.color ? chalk_1.default.greenBright(key) : key) + '"'
                        : outputOptions.color
                            ? chalk_1.default.green(key)
                            : key) +
                    "}json-to-plain-text-special-string-" +
                    key.length +
                    "{" +
                    handler(value, true);
        });
        return output;
    }
    // Handlers for different data types
    const handlers = {
        // Handle cases where data is undefined or null
        undefined: function () {
            return outputOptions.color ? chalk_1.default.gray("null") : "null";
        },
        null: function () {
            return outputOptions.color ? chalk_1.default.gray("null") : "null";
        },
        // Handle numbers
        number: function (x) {
            return outputOptions.color
                ? chalk_1.default.blueBright(x.toString())
                : x.toString();
        },
        // Handle booleans
        boolean: function (x) {
            return outputOptions.color
                ? chalk_1.default.magenta(x ? "true" : "false")
                : x
                    ? "true"
                    : "false";
        },
        // Handle strings
        string: function (x) {
            const str = outputOptions.color
                ? chalk_1.default.yellow(x.toString())
                : x.toString();
            return outputOptions.doubleQuotesForValues ? '"' + str + '"' : str;
        },
        // Handle arrays, check for circular references
        array: function (x) {
            if (visited.has(x)) {
                return outputOptions.color ? chalk_1.default.red("[Circular]") : "[Circular]";
            }
            visited.add(x);
            const output = handleArray(x);
            visited.delete(x);
            return output;
        },
        // Handle objects, check for circular references
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        object: function (x, inArray) {
            if (visited.has(x)) {
                return outputOptions.color ? chalk_1.default.red("[Circular]") : "[Circular]";
            }
            visited.add(x);
            const output = handleObject(x);
            visited.delete(x);
            return output;
        },
        // Handle dates
        date: function (x) {
            return outputOptions.color
                ? chalk_1.default.cyan(x.toISOString())
                : x.toISOString();
        },
        // Handle regular expressions
        regexp: function (x) {
            return outputOptions.color ? chalk_1.default.redBright(x.toString()) : x.toString();
        },
        // Handle functions
        function: function () {
            return outputOptions.color
                ? chalk_1.default.blue("[object Function]")
                : "[object Function]";
        },
    };
    // Start the conversion with the root data and return the final result
    return handlers[getType(data)](data, false).replace(/}json-to-plain-text-special-string-(\d+){/g, (match, number) => {
        const space = parseInt(number, 10);
        return outputOptions.spacing
            ? " ".repeat(indentLevel - space) + ` ${outputOptions.seperator} `
            : ` ${outputOptions.seperator} `;
    });
}
exports.jsonToPlainText = jsonToPlainText;
