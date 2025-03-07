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
exports.IPostConverter = void 0;
var Coverter_1 = require("./Coverter");
var Stack_1 = require("../stack/Stack");
var helprt_1 = require("./helprt");
var IPostConverter = /** @class */ (function (_super) {
    __extends(IPostConverter, _super);
    function IPostConverter(expression) {
        return _super.call(this, expression) || this;
    }
    /**
     * Get postfix expression from infix
     * @returns postfix expression
     */
    IPostConverter.prototype.convert = function () {
        if (this.out != null) {
            return this.out;
        }
        var stack = new Stack_1.Stack();
        this.out = "";
        var char = '';
        var position = -1;
        for (var i = 0; i < this["in"].length; i++) {
            char = this["in"].charAt(i);
            // if char digit or dot 
            if ((helprt_1.Helper.isMiuns(char, this["in"].charAt(i + 1))) && (i != position)) {
                var newIput = this["in"].slice(0, i).trim();
                if ((newIput.length > 0) && (helprt_1.Helper.isDigit(newIput.charAt(newIput.length - 1)))) {
                    char = '+';
                    position = i;
                    --i;
                }
            }
            if (helprt_1.Helper.isDigit(char) || helprt_1.Helper.isDot(char) || helprt_1.Helper.isSpace(char) || helprt_1.Helper.isMiuns(char, this["in"].charAt(i + 1))) {
                this.out += char;
            }
            // if char is ( 
            else if (helprt_1.Helper.isOpenBracket(char)) {
                stack.push(char);
            }
            // if char is )
            else if (helprt_1.Helper.isClosedBracket(char)) {
                while ((!stack.isEmpty()) && (!helprt_1.Helper.isOpenBracket(stack.peek()))) {
                    this.out += " " + stack.pop();
                }
                stack.pop();
            }
            // if char is operator
            else {
                if (Coverter_1.Evaluator.availableOperators.indexOf(char) == -1) {
                    this.out += "0";
                }
                else {
                    this.out += " ";
                    while ((!stack.isEmpty()) && (helprt_1.Helper.mathOperatorPriority(char) <= helprt_1.Helper.mathOperatorPriority(stack.peek()))) {
                        this.out += stack.pop() + " ";
                    }
                    stack.push(char);
                }
            }
        }
        while (!stack.isEmpty()) {
            this.out += " " + stack.pop() + " ";
        }
        return this.out;
    };
    /**
     *
     * @param expression
     */
    IPostConverter.prototype.evaluate = function () {
        if (this.out == null) {
            this.convert();
        }
        var stack = new Stack_1.Stack();
        for (var _i = 0, _a = this.out.trim().split(" "); _i < _a.length; _i++) {
            var current = _a[_i];
            if (current == '') {
                continue;
            }
            if (helprt_1.Helper.isDigit(current)) {
                stack.push(current);
            }
            else {
                stack.push(Coverter_1.Evaluator.mathOperations(stack.isEmpty() ? 0 : parseFloat(stack.pop()), stack.isEmpty() ? 0 : parseFloat(stack.pop()), current).toString());
            }
        }
        return ((!stack.isEmpty()) && (!isNaN(parseFloat(stack.peek())))) ? parseFloat(stack.pop()) : 0;
    };
    return IPostConverter;
}(Coverter_1.Converter));
exports.IPostConverter = IPostConverter;
