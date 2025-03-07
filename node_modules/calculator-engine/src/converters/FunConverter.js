"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.FunConverter = void 0;
var Coverter_1 = require("./Coverter");
var FunConverter = /** @class */ (function (_super) {
    __extends(FunConverter, _super);
    function FunConverter(expression, func) {
        var _this = _super.call(this, expression) || this;
        _this.exprs = [];
        _this.regex = /(?<input>(?<fun>[A-Za-z]+)\s{0,}\((?<params>[0-9\.\s\+\-,\*\/\%\^]+)\))/g;
        if (func == undefined) {
            _this.funcs = {};
        }
        else {
            _this.funcs = func;
        }
        return _this;
    }
    FunConverter.prototype.prepare = function () {
        var _a;
        var exp;
        while ((exp = this.regex.exec(this["in"])) !== null) {
            if (typeof this.funcs[exp.groups.fun] == 'function') {
                this.exprs.push({
                    input: exp.groups.input,
                    output: (_a = this.funcs)[exp.groups.fun].apply(_a, exp.groups.params.split(",").map(function (_) {
                        return parseFloat(_);
                    }))
                });
            }
            else if (typeof Math[exp.groups.fun] == 'function') {
                this.exprs.push({
                    input: exp.groups.input,
                    output: Math[exp.groups.fun].apply(Math, exp.groups.params.split(",").map(function (_) {
                        return parseFloat(_);
                    }))
                });
            }
            else {
                throw new Error("Method " + exp.groups.fun + " not found ");
            }
        }
    };
    FunConverter.prototype.convert = function () {
        if (this.out == null) {
            this.prepare();
        }
        this.out = this["in"];
        for (var i = 0; i < this.exprs.length; i++) {
            this.out = this.out.replace(this.exprs[i].input, this.exprs[i].output);
        }
        this.out = this.out.replace(/[A-Za-z]*/g, '');
        return this.out;
    };
    return FunConverter;
}(Coverter_1.Converter));
exports.FunConverter = FunConverter;
