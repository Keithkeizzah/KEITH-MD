"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnableToScrapeDataError = void 0;
class UnableToScrapeDataError extends Error {
    constructor() {
        super("Unable to scrape data");
    }
}
exports.UnableToScrapeDataError = UnableToScrapeDataError;
