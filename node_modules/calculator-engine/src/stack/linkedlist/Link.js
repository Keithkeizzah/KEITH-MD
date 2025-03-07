"use strict";
exports.__esModule = true;
exports.Link = void 0;
var Link = /** @class */ (function () {
    function Link(data) {
        this.data = data;
        this.next = this.previous = null;
    }
    Link.prototype.display = function () {
        console.log(this.data);
    };
    return Link;
}());
exports.Link = Link;
