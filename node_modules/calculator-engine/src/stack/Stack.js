"use strict";
exports.__esModule = true;
exports.Stack = void 0;
var List_1 = require("./linkedlist/List");
var Stack = /** @class */ (function () {
    function Stack() {
        this.list = new List_1.List();
    }
    Stack.prototype.push = function (value) {
        this.list.insertFirst(value);
    };
    Stack.prototype.pop = function () {
        if (this.isEmpty()) {
            throw new Error("Stack Is Empty");
        }
        return this.list.removeFirst();
    };
    Stack.prototype.peek = function () {
        if (this.isEmpty()) {
            throw new Error("Stack Is Empty");
        }
        return this.list.getFirst();
    };
    Stack.prototype.isEmpty = function () {
        return this.list.isEmpty();
    };
    Stack.prototype.size = function () {
        return this.list.length();
    };
    Stack.prototype.display = function () {
        this.list.display();
    };
    return Stack;
}());
exports.Stack = Stack;
