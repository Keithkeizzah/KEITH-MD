"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artist = exports.ArtistSorts = void 0;
const song_1 = require("../songs/song");
const errors_1 = require("../errors");
const types_1 = require("../helpers/types");
exports.ArtistSorts = ["title", "popularity"];
class Artist {
    constructor(client, res, partial = false) {
        this.client = client;
        this.partial = partial;
        this.name = res.name;
        this.id = parseInt(res.id);
        this.url = res.url;
        this.thumbnail = res.header_image_url;
        this.image = res.image_url;
        this.iq = parseInt(res.iq) ?? 0;
        this.verified = {
            normal: res.is_verified,
            meme: res.is_meme_verified,
        };
        this.socialmedia = {
            facebook: res.facebook_name ?? undefined,
            twitter: res.twitter_name ?? undefined,
        };
        this._raw = res;
    }
    /**
     * Fetches the songs of the artist (requires key).
     * @example const Songs = await Artist.songs();
     */
    async songs(options = {}) {
        if (!(0, types_1.isString)(this.client.key)) {
            throw new errors_1.RequiresGeniusKeyError();
        }
        if (!(0, types_1.isObject)(options)) {
            throw new errors_1.InvalidTypeError("options", "object", typeof options);
        }
        if (!(0, types_1.isUndefined)(options.sort) && !exports.ArtistSorts.includes(options.sort)) {
            throw new errors_1.InvalidTypeError("options.sort", (0, types_1.joinTypes)(...exports.ArtistSorts), typeof options.sort);
        }
        if (!(0, types_1.isUndefined)(options.page) && !(0, types_1.isNumber)(options.page)) {
            throw new errors_1.InvalidTypeError("options.page", (0, types_1.joinTypes)("number", "undefined"), typeof options.page);
        }
        if (!(0, types_1.isUndefined)(options.page) && !(0, types_1.isNumber)(options.page)) {
            throw new errors_1.InvalidTypeError("options.perPage", (0, types_1.joinTypes)("number", "undefined"), typeof options.perPage);
        }
        const nOptions = {
            sort: options.sort ?? "title",
            page: options.page ?? 1,
            perPage: options.perPage ?? 20,
        };
        const data = await this.client.api.get(`/artists/${this.id}/songs?page=${nOptions.page}&per_page=${nOptions.perPage}&sort=${nOptions.sort}`);
        const parsed = JSON.parse(data);
        return parsed.response.songs.map((s) => new song_1.Song(this.client, s, true));
    }
    /**
     * Fetches all information about the artist and updates all the existing properties (requires key).
     * @example const NewArtist = await Artist.fetch();
     */
    async fetch() {
        if (!(0, types_1.isString)(this.client.key)) {
            throw new errors_1.RequiresGeniusKeyError();
        }
        const data = await this.client.api.get(`/artists/${this.id}`);
        const parsed = JSON.parse(data);
        this.socialmedia.facebook = parsed.artist.facebook_name;
        this.socialmedia.twitter = parsed.artist.twitter_name;
        this._raw = parsed.artist;
        this.partial = false;
        return new Artist(this.client, parsed.artist, false);
    }
}
exports.Artist = Artist;
