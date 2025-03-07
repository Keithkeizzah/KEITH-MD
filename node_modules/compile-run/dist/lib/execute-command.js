"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var path_1 = __importDefault(require("path"));
function execute(cmd) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var timeout = 3000;
    var stdin = '';
    var stdoutLimit = 1000;
    var stderrLimit = 1000;
    return new Promise(function (res, rej) {
        var p;
        var arr = undefined;
        if (args[0] && args[0] instanceof Array) {
            arr = args[0];
            if (args[1] && typeof args[1] === 'object') {
                timeout = args[1] && args[1].timeout || timeout;
                stdin = args[1] && args[1].stdin || stdin;
                stderrLimit = args[1] && args[1].stderrLimit || stderrLimit;
                stdoutLimit = args[1] && args[1].stdoutLimit || stdoutLimit;
            }
        }
        else if (args[0] && typeof args[0] === 'object') {
            timeout = args[0] && args[0].timeout || timeout;
            stdin = args[0] && args[0].stdin || stdin;
            stderrLimit = args[0] && args[0].stderrLimit || stderrLimit;
            stdoutLimit = args[0] && args[0].stdoutLimit || stdoutLimit;
        }
        p = child_process_1.spawn('node', [path_1.default.join(__dirname, 'box')], {
            stdio: ['inherit', 'inherit', 'inherit', 'ipc']
        });
        p.send({
            cmd: cmd,
            timeout: timeout,
            stdin: stdin,
            stderrLimit: stderrLimit,
            stdoutLimit: stdoutLimit,
            arguments: arr
        });
        p.on('message', function (msg) {
            if (msg.status == 'success') {
                res(msg.executionResult);
            }
            else {
                rej(msg.error);
            }
            p.kill();
        });
    });
}
exports.execute = execute;
//# sourceMappingURL=execute-command.js.map