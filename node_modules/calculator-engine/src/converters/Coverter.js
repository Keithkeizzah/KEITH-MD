"use strict";
exports.__esModule = true;
exports.Evaluator = exports.Converter = void 0;
var Evaluator = /** @class */ (function () {
    function Evaluator() {
    }
    Evaluator.mathOperations = function (second, first, operation) {
        switch (operation) {
            case "+": return first + second;
            case "-": return first - second;
            case "*": return first * second;
            case "/": return first / second;
            case "%": return first % second;
            case '^': return Math.pow(first, second);
            default: return 0.0;
        }
    };
    Evaluator.availableOperators = "+-*/%^";
    return Evaluator;
}());
exports.Evaluator = Evaluator;
var Converter = /** @class */ (function () {
    function Converter(expression) {
        this["in"] = expression;
        this.out = null;
    }
    Converter.prototype.getOutput = function () {
        if (this.out == null) {
            return this.convert();
        }
        return this.out;
    };
    return Converter;
}());
exports.Converter = Converter;
;
