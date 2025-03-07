"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsClient = void 0;
const http_1 = require("../helpers/http");
const song_1 = require("./song");
const constants_1 = require("../helpers/constants");
const errors_1 = require("../errors");
const types_1 = require("../helpers/types");
const utils_1 = require("../utils");
const scrapedSong_1 = require("./scrapedSong");
class SongsClient {
    /**
     * @example const SongsClient = new Genius.Songs.Client(key);
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Searches for songs for the provided query.
     * @example const SearchResults = await SongsClient.search("faded");
     */
    async search(query, options) {
        if (!(0, types_1.isString)(query)) {
            throw new errors_1.InvalidTypeError("query", "string", typeof query);
        }
        const nOptions = {
            sanitizeQuery: options?.sanitizeQuery ?? true,
        };
        const encodedQuery = encodeURIComponent(nOptions.sanitizeQuery ? SongsClient.sanitizeQuery(query) : query);
        let result = [];
        if ((0, types_1.isString)(this.client.key)) {
            const data = await this.client.api.get(`/search?q=${encodedQuery}`);
            const parsed = JSON.parse(data);
            result = parsed.response.hits;
        }
        else {
            const res = await (0, http_1.request)(`${this.client.config.origin?.url || constants_1.Constants.unofficialApiURL}/search/song?per_page=5&q=${encodedQuery}`, {
                ...this.client.config.requestOptions,
                headers: {
                    "User-Agent": constants_1.Constants.defaultUserAgent,
                    ...this.client.config.requestOptions?.headers,
                },
            });
            const parsed = JSON.parse(await res.body.text());
            if (!parsed?.response?.sections) {
                throw new errors_1.NoResultError();
            }
            result = parsed.response.sections.reduce((pv, x) => [...pv, ...x.hits], []);
        }
        return result
            .filter((s) => s.type === "song")
            .map((s) => new song_1.Song(this.client, s.result, true));
    }
    /**
     * Fetches the song using the provided ID (requires key).
     * @example const Song = await SongsClient.get(3276244);
     */
    async get(id) {
        if (!(0, types_1.isString)(this.client.key)) {
            throw new errors_1.RequiresGeniusKeyError();
        }
        if (!(0, types_1.isNumber)(id)) {
            throw new errors_1.InvalidTypeError("id", "number", typeof id);
        }
        const data = await this.client.api.get(`/songs/${id}`);
        const parsed = JSON.parse(data);
        return new song_1.Song(this.client, parsed.response.song, false);
    }
    /**
     * Scrapes the song page for data.
     * @example const ScrapedSong = await SongsClient.scape("https://genius.com/Alan-walker-faded-lyrics");
     */
    async scrape(url) {
        const body = await this.client.request.get(url);
        const raw = (0, utils_1.contentBetween)(body, "window.__PRELOADED_STATE__ = JSON.parse('", "');");
        if (!raw) {
            throw new errors_1.UnableToScrapeDataError();
        }
        const data = JSON.parse((0, utils_1.unescapeJsonEscaped)(raw));
        return new scrapedSong_1.ScrapedSong(data);
    }
    // Source: https://github.com/farshed/genius-lyrics-api/blob/110397a9f05fe20c4ded92418430f665f074c4e4/lib/utils/index.js#L15
    static sanitizeQuery(query) {
        return query
            .toLowerCase()
            .replace(/ *\([^)]*\) */g, "")
            .replace(/ *\[[^\]]*]/, "")
            .replace(/feat\.|ft\./g, "")
            .replace(/\s+/g, " ")
            .trim();
    }
}
exports.SongsClient = SongsClient;
