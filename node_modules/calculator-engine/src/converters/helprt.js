"use strict";
exports.__esModule = true;
exports.Helper = void 0;
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.isDigit = function (value) {
        if (isNaN(parseFloat(value))) {
            return false;
        }
        return true;
    };
    Helper.isDot = function (value) {
        return "." === value;
    };
    Helper.isSpace = function (value) {
        return " " === value;
    };
    Helper.isOpenBracket = function (value) {
        return "(" === value;
    };
    Helper.isClosedBracket = function (value) {
        return ")" === value;
    };
    Helper.isMiuns = function (value, nextValue) {
        return (("-" === value) && (Helper.isDigit(nextValue)));
    };
    Helper.mathOperatorPriority = function (value) {
        switch (value) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
            case '%':
                return 2;
            case '^':
                return 3;
            default:
                return 0;
        }
    };
    return Helper;
}());
exports.Helper = Helper;
