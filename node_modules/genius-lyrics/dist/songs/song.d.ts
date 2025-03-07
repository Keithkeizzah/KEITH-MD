import { Client } from "../client";
import { Album } from "../albums/album";
import { Artist } from "../artists/artist";
export declare class Song {
    readonly client: Client;
    partial: boolean;
    title: string;
    fullTitle: string;
    featuredTitle: string;
    id: number;
    thumbnail: string;
    image: string;
    url: string;
    endpoint: string;
    artist: Artist;
    album?: Album;
    releasedAt?: Date;
    instrumental: boolean;
    _raw: any;
    constructor(client: Client, res: any, partial?: boolean);
    /**
     * Fetches lyrics of the track.
     * @example const Lyrics = await Song.lyrics(true);
     */
    lyrics(removeChorus?: boolean): Promise<string>;
    /**
     * Fetches all information about the track and updates all the existing properties (requires key).
     * @example const NewSong = await Song.fetch();
     */
    fetch(): Promise<Song>;
    static removeChorus(lyrics: string): string;
}
