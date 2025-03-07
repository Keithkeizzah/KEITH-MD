"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDay = exports.getCurrentMonth = exports.getCurrentYear = exports.setPageId = exports.setPageIdOrTitleParam = exports.setTitleForPage = exports.isString = void 0;
const _1 = require(".");
const errors_1 = require("./errors");
const messages_1 = require("./messages");
//check if input is string
function isString(title) {
    return isNaN(title);
}
exports.isString = isString;
//set title for page in case autoSuggest is true
async function setTitleForPage(title) {
    {
        const searchResult = await _1.default.search(title, { limit: 1, suggestion: true });
        if (!searchResult.suggestion && searchResult.results.length == 0) {
            throw new errors_1.pageError(`${messages_1.MSGS.PAGE_NOT_SUGGEST}${title}`);
        }
        title = searchResult.suggestion || title;
        return title;
    }
}
exports.setTitleForPage = setTitleForPage;
//Set page id or title param for legacy api queries
function setPageIdOrTitleParam(params, title) {
    if (isString(title)) {
        params.titles = title;
    }
    else {
        params.pageids = title;
    }
    return params;
}
exports.setPageIdOrTitleParam = setPageIdOrTitleParam;
//Get page id from params or from results
function setPageId(params, results) {
    let pageId;
    if (params.pageIds) {
        pageId = params.pageIds;
    }
    else {
        pageId = Object.keys(results.query.pages)[0];
    }
    return pageId;
}
exports.setPageId = setPageId;
//Get current year
function getCurrentYear() {
    const date = new Date();
    const year = date.getFullYear();
    return (year);
}
exports.getCurrentYear = getCurrentYear;
//Get current month
function getCurrentMonth() {
    const date = new Date();
    const month = date.getMonth();
    return (month + 1); //javascript months are indexed at zero for some reason
}
exports.getCurrentMonth = getCurrentMonth;
//Get current day
function getCurrentDay() {
    const date = new Date();
    const day = date.getDate();
    return day;
}
exports.getCurrentDay = getCurrentDay;
