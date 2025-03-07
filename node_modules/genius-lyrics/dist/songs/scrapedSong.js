"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapedSong = void 0;
const errors_1 = require("../errors");
const types_1 = require("../helpers/types");
const song_1 = require("./song");
class ScrapedSong {
    constructor(data) {
        this.data = data;
    }
    /**
     * Parses lyrics of the scraped track.
     * @example const Lyrics = await ScrapedSong.lyrics(true);
     */
    lyrics(removeChorus = false) {
        if (!(0, types_1.isBoolean)(removeChorus)) {
            throw new errors_1.InvalidTypeError("removeChorus", "boolean", typeof removeChorus);
        }
        const lyrics = ScrapedSong.parseLyricsDataBodyChildren(this.data.songPage.lyricsData.body.children);
        return removeChorus ? song_1.Song.removeChorus(lyrics) : lyrics;
    }
    static parseLyricsDataBodyChildren(children) {
        let lyrics = "";
        for (const x of children) {
            if (typeof x === "string") {
                lyrics += x;
            }
            else if (x.tag === "br" || x.tag === "inread-ad") {
                lyrics += "\n";
            }
            else if (x.children) {
                lyrics += this.parseLyricsDataBodyChildren(x.children);
            }
        }
        return lyrics;
    }
}
exports.ScrapedSong = ScrapedSong;
