"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistsClient = void 0;
const artist_1 = require("./artist");
const errors_1 = require("../errors");
const types_1 = require("../helpers/types");
class ArtistsClient {
    /**
     * @example const ArtistsClient = await Genius.Artist.Client(key);
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Fetches the artist using the provided ID (requires key).
     * @example const Artist = await ArtistsClient.get(456537);
     */
    async get(id) {
        if (!(0, types_1.isString)(this.client.key)) {
            throw new errors_1.RequiresGeniusKeyError();
        }
        if (!(0, types_1.isNumber)(id)) {
            throw new errors_1.InvalidTypeError("id", "number", typeof id);
        }
        const data = await this.client.api.get(`/artists/${id}`);
        const parsed = JSON.parse(data);
        return new artist_1.Artist(this.client, parsed.response.artist, false);
    }
}
exports.ArtistsClient = ArtistsClient;
