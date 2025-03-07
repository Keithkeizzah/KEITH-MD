"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./lib/init");
var c_1 = __importDefault(require("./lib/c"));
exports.c = c_1.default;
var cpp_1 = __importDefault(require("./lib/cpp"));
exports.cpp = cpp_1.default;
var python_1 = __importDefault(require("./lib/python"));
exports.python = python_1.default;
var node_1 = __importDefault(require("./lib/node"));
exports.node = node_1.default;
var java_1 = __importDefault(require("./lib/java"));
exports.java = java_1.default;
var compileRun = { c: c_1.default, cpp: cpp_1.default, python: python_1.default, node: node_1.default, java: java_1.default };
exports.default = compileRun;
//# sourceMappingURL=index.js.map