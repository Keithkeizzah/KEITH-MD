"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestClient = void 0;
const http_1 = require("./helpers/http");
const errors_1 = require("./errors");
class RequestClient {
    constructor(base, options) {
        this.base = base;
        this.options = options;
    }
    async get(route, options) {
        const url = this.base ? `${this.base}${route}` : route;
        try {
            const { body } = await (0, http_1.request)(url, {
                ...this.options,
                ...options,
                headers: {
                    ...options?.headers,
                    ...this.options?.headers,
                },
                throwOnError: true,
            });
            return body.text();
        }
        catch (err) {
            throw this._handleError(err);
        }
    }
    _handleError(error) {
        if (error instanceof http_1.errors.ResponseStatusCodeError) {
            switch (error.statusCode) {
                case 401:
                    return new errors_1.InvalidGeniusKeyError();
                case 404:
                    return new errors_1.NoResultError();
                default:
                    return new errors_1.UnexpectedResponseError(error);
            }
        }
        return error;
    }
}
exports.RequestClient = RequestClient;
