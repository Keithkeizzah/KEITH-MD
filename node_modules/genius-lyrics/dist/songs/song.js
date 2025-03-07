"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const album_1 = require("../albums/album");
const artist_1 = require("../artists/artist");
const errors_1 = require("../errors");
const types_1 = require("../helpers/types");
class Song {
    constructor(client, res, partial = false) {
        this.client = client;
        this.partial = partial;
        this.title = res.title;
        this.fullTitle = res.full_title;
        this.featuredTitle = res.title_with_featured;
        this.id = parseInt(res.id);
        this.thumbnail = res.header_image_thumbnail_url;
        this.image = res.header_image_url;
        this.url = res.url;
        this.endpoint = res.api_path;
        this.artist = new artist_1.Artist(this.client, res.primary_artist, true);
        this.partial = partial;
        this.album =
            !this.partial && res.album
                ? new album_1.Album(res.album, this.artist)
                : undefined;
        this.releasedAt =
            !this.partial && res.release_date
                ? new Date(res.release_date)
                : undefined;
        this.instrumental = res.instrumental;
        this._raw = res;
    }
    /**
     * Fetches lyrics of the track.
     * @example const Lyrics = await Song.lyrics(true);
     */
    async lyrics(removeChorus = false) {
        if (!(0, types_1.isBoolean)(removeChorus)) {
            throw new errors_1.InvalidTypeError("removeChorus", "boolean", typeof removeChorus);
        }
        const body = await this.client.request.get(this.url);
        const document = (0, node_html_parser_1.default)(body);
        const lyricsRoot = document.getElementById("lyrics-root");
        const lyrics = lyricsRoot
            ?.querySelectorAll("[data-lyrics-container='true']")
            .map((x) => {
            x.querySelectorAll("br").forEach((y) => {
                y.replaceWith(new node_html_parser_1.default.TextNode("\n"));
            });
            return x.text;
        })
            .join("\n")
            .trim();
        if (!lyrics?.length) {
            throw new errors_1.NoResultError();
        }
        return removeChorus ? Song.removeChorus(lyrics) : lyrics;
    }
    /**
     * Fetches all information about the track and updates all the existing properties (requires key).
     * @example const NewSong = await Song.fetch();
     */
    async fetch() {
        if (!(0, types_1.isString)(this.client.key)) {
            throw new errors_1.RequiresGeniusKeyError();
        }
        const data = await this.client.api.get(`/songs/${this.id}`);
        const parsed = JSON.parse(data);
        this.album = parsed.response.song.album
            ? new album_1.Album(parsed.response.song.album, this.artist)
            : undefined;
        this.releasedAt = parsed.response.song.release_date
            ? new Date(parsed.response.song.release_date)
            : undefined;
        this.partial = false;
        return this;
    }
    static removeChorus(lyrics) {
        return lyrics.replace(/\[[^\]]+\]\n?/g, "");
    }
}
exports.Song = Song;
