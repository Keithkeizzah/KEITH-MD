"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A helper fn to make code more dry for the runfile and runsource set of funtions
 *
 * It just takes care of the optional callback and options obj and return the result promise and execute callback if provided.
 * @param arg0 First argument to be passed into function
 * @param func Function to be executed, Must return a promise
 * @param args Arguments to be taken care of
 */
function multipleArgsCallbackifier(arg0, func) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var p;
    if (typeof args[0] === 'object') {
        p = func(arg0, args[0]);
    }
    else {
        p = func(arg0);
    }
    if (typeof args[0] === 'function') {
        p
            .then(function (result) {
            args[0](undefined, result);
        })
            .catch(function (err) {
            args[0](err);
        });
    }
    else if (typeof args[1] === 'function') {
        p
            .then(function (result) {
            args[1](undefined, result);
        })
            .catch(function (err) {
            args[1](err);
        });
    }
    return p;
}
exports.multipleArgsCallbackifier = multipleArgsCallbackifier;
//# sourceMappingURL=helper.js.map