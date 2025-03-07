"use strict";
exports.__esModule = true;
exports.Calculator = void 0;
var FunConverter_1 = require("./converters/FunConverter");
var IPostConverter_1 = require("./converters/IPostConverter");
var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.execute = function (expression) {
        var postConverter = new IPostConverter_1.IPostConverter((new FunConverter_1.FunConverter(expression, Calculator.fucs).convert()));
        return postConverter.evaluate();
    };
    Calculator.setFucs = function (fucs) {
        Calculator.fucs = fucs;
    };
    Calculator.fucs = {};
    return Calculator;
}());
exports.Calculator = Calculator;
