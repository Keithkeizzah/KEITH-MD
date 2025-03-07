import { Client } from "../";
import { Song } from "./song";
import { ScrapedSong } from "./scrapedSong";
export interface SongSearchOptions {
    sanitizeQuery: boolean;
}
export declare class SongsClient {
    readonly client: Client;
    /**
     * @example const SongsClient = new Genius.Songs.Client(key);
     */
    constructor(client: Client);
    /**
     * Searches for songs for the provided query.
     * @example const SearchResults = await SongsClient.search("faded");
     */
    search(query: string, options?: Partial<SongSearchOptions>): Promise<Song[]>;
    /**
     * Fetches the song using the provided ID (requires key).
     * @example const Song = await SongsClient.get(3276244);
     */
    get(id: number): Promise<Song>;
    /**
     * Scrapes the song page for data.
     * @example const ScrapedSong = await SongsClient.scape("https://genius.com/Alan-walker-faded-lyrics");
     */
    scrape(url: string): Promise<ScrapedSong>;
    static sanitizeQuery(query: string): string;
}
