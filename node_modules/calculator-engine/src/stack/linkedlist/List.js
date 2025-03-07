"use strict";
exports.__esModule = true;
exports.List = void 0;
var Link_1 = require("./Link");
var List = /** @class */ (function () {
    function List(data) {
        this.len = 0;
        if (data == undefined) {
            this.first = this.last = null;
        }
        else {
            this.entryPoint(data);
        }
    }
    List.prototype.entryPoint = function (data) {
        this.last = this.first = new Link_1.Link(data);
        this.len++;
    };
    List.prototype.isEmpty = function () {
        return (((this.first == null) && (this.last == null)) || (this.len <= 0));
    };
    List.prototype.insertFirst = function (data) {
        if (this.isEmpty()) {
            this.entryPoint(data);
        }
        else {
            var tmp = this.first;
            this.first = new Link_1.Link(data);
            this.first.next = tmp;
            tmp.previous = this.first;
            this.len++;
        }
        return 0;
    };
    List.prototype.insertLast = function (data) {
        if (this.isEmpty)
            this.entryPoint(data);
        else {
            var tmp = this.last;
            this.last = new Link_1.Link(data);
            this.last.previous = tmp;
            tmp.next = this.last;
            this.len++;
        }
        return 0;
    };
    List.prototype.removeFirst = function () {
        if (this.isEmpty()) {
            return null;
        }
        var tmp = this.first;
        if (tmp.next == null) {
            this.first = this.last = null;
        }
        else {
            this.first = tmp.next;
        }
        this.len--;
        return tmp.data;
    };
    List.prototype.removeLast = function () {
        if ((this.isEmpty())) {
            return null;
        }
        var tmp = this.last;
        if (tmp.previous == null) {
            this.last = tmp.previous;
            this.last.next != null ? this.last.next = null : "";
        }
        else {
            this.first = this.last = null;
        }
        this.len--;
        return tmp.data;
    };
    List.prototype.getFirst = function () {
        return this.first == null ? null : this.first.data;
    };
    List.prototype.getLast = function () {
        return this.last == null ? null : this.last.data;
    };
    List.prototype.length = function () {
        return this.len;
    };
    List.prototype.display = function () {
        var tmp = this.first;
        while (tmp != null) {
            tmp.display();
            tmp = tmp.next;
        }
    };
    return List;
}());
exports.List = List;
