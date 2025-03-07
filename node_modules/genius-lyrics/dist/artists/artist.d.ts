import { Client } from "../client";
import { Song } from "../songs/song";
export declare const ArtistSorts: readonly ["title", "popularity"];
export type IArtistSorts = (typeof ArtistSorts)[number];
export interface IArtistGetSongsOptions {
    sort: IArtistSorts;
    page: number;
    perPage: number;
}
export declare class Artist {
    readonly client: Client;
    partial: boolean;
    name: string;
    id: number;
    url: string;
    thumbnail: string;
    image: string;
    iq: number;
    verified: {
        normal: boolean;
        meme: boolean;
    };
    socialmedia: {
        facebook?: string;
        twitter?: string;
    };
    _raw: any;
    constructor(client: Client, res: any, partial?: boolean);
    /**
     * Fetches the songs of the artist (requires key).
     * @example const Songs = await Artist.songs();
     */
    songs(options?: Partial<IArtistGetSongsOptions>): Promise<Song[]>;
    /**
     * Fetches all information about the artist and updates all the existing properties (requires key).
     * @example const NewArtist = await Artist.fetch();
     */
    fetch(): Promise<Artist>;
}
